import { FeedbacksRepository, feedbackCreateData } from "../feedbacks-repository";

import { prisma } from "../../prisma";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({type, comment, screenshot}: feedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    })
  }
}