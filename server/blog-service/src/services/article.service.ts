import { prisma } from "@rizlax/db-client";
import { ArticleStatus } from "@prisma/client";
import { DomainError } from "@rizlax/common-middleware";

interface CreateArticleData {
  title: string;
  content: string;
  authorId: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  readingTime?: number;
  isFeatured?: boolean;
}

interface UpdateArticleData {
  title?: string;
  content?: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  readingTime?: number;
  isFeatured?: boolean;
}

const articleInclude = {
  author: {
    select: {
      id: true,
      name: true,
      email: true,
      profilePicture: true,
    },
  },
  tags: {
    include: {
      tag: true,
    },
  },
};

class ArticleService {
  /**
   * Create a new article (defaults to DRAFT status)
   */
  async createArticle(data: CreateArticleData) {
    const { tags, ...articleData } = data;

    return await prisma.article.create({
      data: {
        ...articleData,
        status: ArticleStatus.DRAFT,
        published: false,
        tags: tags
          ? {
              create: tags.map((tagName) => ({
                tag: {
                  connectOrCreate: {
                    where: { name: tagName },
                    create: { name: tagName },
                  },
                },
              })),
            }
          : undefined,
      },
      include: articleInclude,
    });
  }

  /**
   * Get article by ID
   */
  async getArticleById(id: string) {
    return await prisma.article.findUnique({
      where: { id },
      include: articleInclude,
    });
  }

  /**
   * Get article by slug
   */
  async getArticleBySlug(slug: string) {
    return await prisma.article.findUnique({
      where: { slug },
      include: articleInclude,
    });
  }

  /**
   * Get all articles with optional filters
   */
  async getAllArticles(filter?: {
    status?: ArticleStatus;
    published?: boolean;
    authorId?: string;
    isFeatured?: boolean;
  }) {
    return await prisma.article.findMany({
      where: {
        ...filter,
      },
      include: articleInclude,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Update article (only DRAFT or CANCELLED articles can be edited)
   */
  async updateArticle(id: string, data: UpdateArticleData) {
    const article = await this.getArticleById(id);

    if (!article) {
      throw new DomainError("ARTICLE_SERVICE", "ARTICLE_NOT_FOUND", 404);
    }

    if (article.status === ArticleStatus.PUBLISHED) {
      throw new DomainError("ARTICLE_SERVICE", "CANNOT_EDIT_PUBLISHED_ARTICLE", 400);
    }

    const { tags, ...updateData } = data;

    return await prisma.article.update({
      where: { id },
      data: {
        ...updateData,
        tags: tags
          ? {
              deleteMany: {},
              create: tags.map((tagName) => ({
                tag: {
                  connectOrCreate: {
                    where: { name: tagName },
                    create: { name: tagName },
                  },
                },
              })),
            }
          : undefined,
      },
      include: articleInclude,
    });
  }

  /**
   * Publish an article
   */
  async publishArticle(id: string) {
    const article = await this.getArticleById(id);

    if (!article) {
      throw new DomainError("ARTICLE_SERVICE", "ARTICLE_NOT_FOUND", 404);
    }

    if (article.status === ArticleStatus.PUBLISHED) {
      throw new DomainError("ARTICLE_SERVICE", "ARTICLE_ALREADY_PUBLISHED", 400);
    }

    return await prisma.article.update({
      where: { id },
      data: {
        status: ArticleStatus.PUBLISHED,
        published: true,
        publishedAt: new Date(),
      },
      include: articleInclude,
    });
  }

  /**
   * Cancel/unpublish an article
   */
  async cancelArticle(id: string) {
    const article = await this.getArticleById(id);

    if (!article) {
      throw new DomainError("ARTICLE_SERVICE", "ARTICLE_NOT_FOUND", 404);
    }

    return await prisma.article.update({
      where: { id },
      data: {
        status: ArticleStatus.CANCELLED,
        published: false,
      },
      include: articleInclude,
    });
  }

  /**
   * Set article to draft mode
   */
  async setDraftMode(id: string) {
    return await prisma.article.update({
      where: { id },
      data: {
        status: ArticleStatus.DRAFT,
        published: false,
      },
      include: articleInclude,
    });
  }

  /**
   * Increment article views
   */
  async incrementViews(id: string) {
    return await prisma.article.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Increment article likes
   */
  async incrementLikes(id: string) {
    return await prisma.article.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  /**
   * Delete an article
   */
  async deleteArticle(id: string) {
    return await prisma.article.delete({
      where: { id },
    });
  }

  /**
   * Get featured articles
   */
  async getFeaturedArticles() {
    return await prisma.article.findMany({
      where: {
        isFeatured: true,
        status: ArticleStatus.PUBLISHED,
      },
      include: articleInclude,
      orderBy: {
        publishedAt: "desc",
      },
    });
  }

  /**
   * Get articles by tag
   */
  async getArticlesByTag(tagName: string) {
    return await prisma.article.findMany({
      where: {
        status: ArticleStatus.PUBLISHED,
        tags: {
          some: {
            tag: {
              name: tagName,
            },
          },
        },
      },
      include: articleInclude,
      orderBy: {
        publishedAt: "desc",
      },
    });
  }
}

export default new ArticleService();
