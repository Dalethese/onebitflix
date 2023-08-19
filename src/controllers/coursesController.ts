import { Request, Response } from "express";
import { courseService } from "../services/courseService";
import { error } from "console";

export const coursesController = {
  /** GET /courses/featured */
  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await courseService.getRandomFeaturedCourses();
      return res.json(featuredCourses);
    } catch (err) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  /** GET /courses/newest */
  newest: async (req: Request, res: Response) => {
    try {
      const newestCourses = await courseService.getTopTenNewest();
      return res.json(newestCourses);
    } catch (err) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  /** GET /courses/search?name= */
  search: async (req: Request, res: Response) => {
    const { name } = req.query;
    try {
      if (typeof name !== "string")
        throw new Error("name param must be type string");

      const courses = await courseService.findByName(name);
      return res.json(courses);
    } catch (err) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  /** GET /courses/:id */
  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const course = await courseService.findByIdWithEpisodes(id);
      return res.json(course);
    } catch (err) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
