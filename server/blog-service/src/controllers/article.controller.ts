import { Request, Response } from "express";
import articleService from "../services/article.service";
import { ArticleStatus } from "@prisma/client";
import logger from "@rizlax/logs";
import { DomainError } from "@rizlax/common-middleware";

class ArticleController {
  /**
   * helpers
   */
  successResponse(
    res: Response,
    statusCode: number,
    message: string,
    data?: any
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }
  /**
   * POST /articles
   * Create a new article
   */
  async createArticle(req: Request, res: Response) {
    try {
      const article = await articleService.createArticle(req.body);
      return this.successResponse(
        res,
        201,
        "Article created successfully",
        article
      );
    } catch (error) {
      if (error instanceof DomainError) throw error;

      throw new DomainError("ARTICLE_CONTROLLER", "FAILED_CREATE_ARTICLE", 500);
    }
  }

  /**
   * GET /articles/:id
   * Get article by ID
   */
  async getArticleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const article = await articleService.getArticleById(id);

      if (!article) {
        throw new DomainError("ARTICLE_CONTROLLER", "ARTICLE_NOT_FOUND", 404);
      }

      return this.successResponse(
        res,
        200,
        "Article fetched successfully",
        article
      );
    } catch (error) {
      if (error instanceof DomainError) throw error;

      throw new DomainError("ARTICLE_CONTROLLER", "FAILED_FETCH_ARTICLE", 500);
    }
  }

  /**
   * GET /articles/slug/:slug
   * Get article by slug
   */
  async getArticleBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const article = await articleService.getArticleBySlug(slug);

      if (!article) {
        throw new DomainError("ARTICLE_CONTROLLER", "ARTICLE_NOT_FOUND", 404);
      }

      // Increment views when fetching by slug (public endpoint)
      await articleService.incrementViews(article.id);

      const finalArticle = await articleService.getArticleBySlug(slug);

      return this.successResponse(
        res,
        200,
        "Article fetched successfully",
        finalArticle
      );
    } catch (error) {
      logger.error("Error fetching article by slug:", error);
      if (error instanceof DomainError) throw error;

      throw new DomainError("ARTICLE_CONTROLLER", "FAILED_FETCH_ARTICLE", 500);
    }
  }

  /**
   * GET /articles
   * Get all articles with optional filters
   */
  async getAllArticles(req: Request, res: Response) {
    try {
      const { status, published, authorId, isFeatured } = req.query;

      const filter: {
        status?: ArticleStatus;
        published?: boolean;
        authorId?: string;
        isFeatured?: boolean;
      } = {};

      if (status) filter.status = status as ArticleStatus;
      if (published !== undefined) filter.published = published === "true";
      if (authorId) filter.authorId = authorId as string;
      if (isFeatured !== undefined) filter.isFeatured = isFeatured === "true";

      const articles = await articleService.getAllArticles(filter);

      return this.successResponse(res, 200, "Articles fetched successfully", {
        articles,
        count: articles.length,
      });
    } catch (error) {
      logger.error("Error fetching articles:", error);
      if (error instanceof DomainError) throw error;

      throw new DomainError("ARTICLE_CONTROLLER", "FAILED_FETCH_ARTICLE", 500);
    }
  }

  /**
   * PUT /articles/:id
   * Update article
   */
  async updateArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const article = await articleService.updateArticle(id, req.body);

      return this.successResponse(
        res,
        200,
        "Article updated successfully",
        article
      );
    } catch (error) {
      if (error instanceof DomainError) throw error;
      throw new DomainError("ARTICLE_CONTROLLER", "FAILED_UPDATE_ARTICLE", 500);
    }
  }

  /**
   * PATCH /articles/:id/publish
   * Publish article
   */
  async publishArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const article = await articleService.publishArticle(id);

      return this.successResponse(
        res,
        200,
        "Article published successfully",
        article
      );
    } catch (error) {
      logger.error("Error publishing article:", error);
      if (error instanceof DomainError) throw error;
      throw new DomainError(
        "ARTICLE_CONTROLLER",
        "FAILED_PUBLISH_ARTICLE",
        500
      );
    }
  }

  /**
   * PATCH /articles/:id/cancel
   * Cancel/unpublish article
   */
  async cancelArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const article = await articleService.cancelArticle(id);

      return this.successResponse(
        res,
        200,
        "Article cancelled successfully",
        article
      );
    } catch (error) {
      if (error instanceof DomainError) throw error;
      throw new DomainError("ARTICLE_CONTROLLER", "FAILED_CANCEL_ARTICLE", 500);
    }
  }

  /**
   * PATCH /articles/:id/draft
   * Set article to draft mode
   */
  async setDraftMode(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const article = await articleService.setDraftMode(id);

      return this.successResponse(
        res,
        200,
        "Article set to draft mode successfully",
        article
      );
    } catch (error) {
      if (error instanceof DomainError) throw error;

      throw new DomainError("ARTICLE_CONTROLLER", "FAILED_SET_DRAFT_MODE", 500);
    }
  }

  /**
   * PATCH /articles/:id/like
   * Increment article likes
   */
  async likeArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const article = await articleService.incrementLikes(id);

      return this.successResponse(
        res,
        200,
        "Article liked successfully",
        article
      );
    } catch (error) {
      if (error instanceof DomainError) throw error;

      throw new DomainError("ARTICLE_CONTROLLER", "FAILED_LIKE_ARTICLE", 500);
    }
  }

  /**
   * DELETE /articles/:id
   * Delete article
   */
  async deleteArticle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await articleService.deleteArticle(id);

      return this.successResponse(res, 200, "Article deleted successfully");
    } catch (error) {
      if (error instanceof DomainError) throw error;

      throw new DomainError("ARTICLE_CONTROLLER", "FAILED_DELETE_ARTICLE", 500);
    }
  }

  /**
   * GET /articles/featured
   * Get featured articles
   */
  async getFeaturedArticles(req: Request, res: Response) {
    try {
      const articles = await articleService.getFeaturedArticles();

      return this.successResponse(
        res,
        200,
        "Featured articles fetched successfully",
        { articles, count: articles.length }
      );
    } catch (error) {
      if (error instanceof DomainError) throw error;

      throw new DomainError(
        "ARTICLE_CONTROLLER",
        "FAILED_FETCH_FEATURED_ARTICLES",
        500
      );
    }
  }

  /**
   * GET /articles/tag/:tagName
   * Get articles by tag
   */
  async getArticlesByTag(req: Request, res: Response) {
    try {
      const { tagName } = req.params;
      const articles = await articleService.getArticlesByTag(tagName);

      return this.successResponse(
        res,
        200,
        "Articles fetched successfully by tag",
        { articles, count: articles.length }
      );
    } catch (error) {
      if (error instanceof DomainError) throw error;

      throw new DomainError(
        "ARTICLE_CONTROLLER",
        "FAILED_FETCH_ARTICLES_BY_TAG",
        500
      );
    }
  }
}

export default ArticleController;
