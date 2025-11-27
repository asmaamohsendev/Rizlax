import { prisma } from "@rizlax/db-client";
import { UserStatus } from "@prisma/client";
import logger from "@rizlax/logs";
import { ViolationType, ViolationSeverity } from "../types/moderation.types.ts";
import profanityPatternsData from "../constants/profanityPatterns.json";
import externalInfoPatternsData from "../constants/externalInfoPatterns.json";

class ContentModerationService {
  // Profanity patterns (English and Arabic)
  private profanityPatterns: RegExp[];
  // External info request patterns
  private externalInfoPatterns: RegExp[];

  constructor() {
    // Convert JSON patterns to RegExp objects
    this.profanityPatterns = [
      ...profanityPatternsData.english.map(pattern => new RegExp(pattern, 'i')),
      ...profanityPatternsData.arabic.map(pattern => new RegExp(pattern))
    ];

    this.externalInfoPatterns = [
      ...externalInfoPatternsData.english.map(pattern => new RegExp(pattern, 'i')),
      ...externalInfoPatternsData.arabic.map(pattern => new RegExp(pattern))
    ];
  }

  /**
   * Check if content contains profanity
   */
  public containsProfanity(content: string): boolean {
    return this.profanityPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Check if content requests external information
   */
  public containsExternalInfoRequest(content: string): boolean {
    return this.externalInfoPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Get user's violation count for a specific type
   */
  private async getViolationCount(userId: string, violationType: ViolationType): Promise<number> {
    try {
      // You'll need to create a UserViolation model in your Prisma schema
      // For now, this is a placeholder - adjust based on your actual schema
      const violations = await prisma.$queryRaw`
        SELECT COUNT(*) as count 
        FROM user_violations 
        WHERE user_id = ${userId} 
        AND violation_type = ${violationType}
        AND (expires_at IS NULL OR expires_at > NOW())
      `;
      
      return Number(violations[0]?.count || 0);
    } catch (error) {
      logger.error(`Error getting violation count: ${error}`);
      return 0;
    }
  }

  /**
   * Record a violation
   */
  private async recordViolation(
    userId: string,
    violationType: ViolationType,
    severity: ViolationSeverity,
    content: string,
    expiresAt?: Date
  ): Promise<void> {
    try {
      // You'll need to create this in your Prisma schema
      await prisma.$executeRaw`
        INSERT INTO user_violations (user_id, violation_type, severity, content, expires_at, created_at)
        VALUES (${userId}, ${violationType}, ${severity}, ${content}, ${expiresAt}, NOW())
      `;
      
      logger.info(`Violation recorded for user ${userId}: ${violationType} - ${severity}`);
    } catch (error) {
      logger.error(`Error recording violation: ${error}`);
      throw error;
    }
  }

  /**
   * Handle profanity violation - 3 day suspension
   */
  public async handleProfanityViolation(userId: string, content: string): Promise<void> {
    try {
      // Calculate suspension expiry (3 days)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 3);

      // Record violation
      await this.recordViolation(
        userId,
        ViolationType.PROFANITY,
        ViolationSeverity.SUSPENSION,
        content,
        expiresAt
      );

      // Suspend user
      await prisma.user.update({
        where: { id: userId },
        data: { 
          status: UserStatus.SUSPENDED,
          suspendedUntil: expiresAt
        },
      });

      logger.info(`User ${userId} suspended for 3 days due to profanity`);
    } catch (error) {
      logger.error(`Error handling profanity violation: ${error}`);
      throw error;
    }
  }

  /**
   * Handle external info request violation
   */
  public async handleExternalInfoViolation(userId: string, content: string): Promise<void> {
    try {
      const violationCount = await this.getViolationCount(userId, ViolationType.EXTERNAL_INFO_REQUEST);

      if (violationCount === 0) {
        // First offense - Warning
        await this.recordViolation(
          userId,
          ViolationType.EXTERNAL_INFO_REQUEST,
          ViolationSeverity.WARNING,
          content
        );
        
        logger.info(`User ${userId} received warning for requesting external info`);
      } else {
        // Second offense - Permanent ban
        await this.recordViolation(
          userId,
          ViolationType.EXTERNAL_INFO_REQUEST,
          ViolationSeverity.PERMANENT_BAN,
          content
        );

        await prisma.user.update({
          where: { id: userId },
          data: { status: UserStatus.BANNED },
        });

        logger.info(`User ${userId} permanently banned for repeated external info requests`);
      }
    } catch (error) {
      logger.error(`Error handling external info violation: ${error}`);
      throw error;
    }
  }

  /**
   * Moderate content - main entry point
   */
  public async moderateContent(userId: string, content: string): Promise<{
    violated: boolean;
    violationType?: ViolationType;
    action?: string;
  }> {
    try {
      // Check for profanity
      if (this.containsProfanity(content)) {
        await this.handleProfanityViolation(userId, content);
        return {
          violated: true,
          violationType: ViolationType.PROFANITY,
          action: 'suspended_3_days'
        };
      }

      // Check for external info request
      if (this.containsExternalInfoRequest(content)) {
        const violationCount = await this.getViolationCount(userId, ViolationType.EXTERNAL_INFO_REQUEST);
        await this.handleExternalInfoViolation(userId, content);
        
        return {
          violated: true,
          violationType: ViolationType.EXTERNAL_INFO_REQUEST,
          action: violationCount === 0 ? 'warning' : 'permanent_ban'
        };
      }

      return { violated: false };
    } catch (error) {
      logger.error(`Error moderating content: ${error}`);
      throw error;
    }
  }
}

export default ContentModerationService;