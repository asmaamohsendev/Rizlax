import { Router } from "express";
import ArticleController from "../controllers/article.controller.ts";
import { AdminOnly } from "../middleware/adminAndModeratorOnly.ts";

const router = Router();

interface IArticleController {
  getArticleBySlug: typeof ArticleController.prototype.getArticleBySlug;
  getAllArticles: typeof ArticleController.prototype.getAllArticles;
  getFeaturedArticles: typeof ArticleController.prototype.getFeaturedArticles;
  getArticlesByTag: typeof ArticleController.prototype.getArticlesByTag;
  likeArticle: typeof ArticleController.prototype.likeArticle;
  getArticleById: typeof ArticleController.prototype.getArticleById;
  createArticle: typeof ArticleController.prototype.createArticle;
  updateArticle: typeof ArticleController.prototype.updateArticle;
  publishArticle: typeof ArticleController.prototype.publishArticle;
  cancelArticle: typeof ArticleController.prototype.cancelArticle;
  setDraftMode: typeof ArticleController.prototype.setDraftMode;
  deleteArticle: typeof ArticleController.prototype.deleteArticle;
}

export default function createArticleRouter(
  articleController: IArticleController,
): Router {
  /**
   * Public Routes
   */
  router.get("/slug/:slug", articleController.getArticleBySlug.bind(articleController));
  router.get("/", articleController.getAllArticles.bind(articleController));
  router.get("/featured", articleController.getFeaturedArticles.bind(articleController));
  router.get("/tag/:tagName", articleController.getArticlesByTag.bind(articleController));
  router.patch("/:id/like", articleController.likeArticle.bind(articleController));
  router.get("/:id", articleController.getArticleById.bind(articleController));

  /**
   * Protected Routes - Admin Only
   */
  router
    .route("/")
    .post(AdminOnly, articleController.createArticle.bind(articleController));

  router
    .route("/:id")
    .put(AdminOnly, articleController.updateArticle.bind(articleController))
    .delete(AdminOnly, articleController.deleteArticle.bind(articleController));

  router
    .route("/:id/publish")
    .patch(AdminOnly, articleController.publishArticle.bind(articleController));

  router
    .route("/:id/cancel")
    .patch(AdminOnly, articleController.cancelArticle.bind(articleController));

  router
    .route("/:id/draft")
    .patch(AdminOnly, articleController.setDraftMode.bind(articleController));

  return router;
}
