import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("seeding db");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      { id: 1, title: "Spanish", imageSrc: "/es.svg" },
      { id: 2, title: "Japan", imageSrc: "/jp.svg" },
      { id: 3, title: "Italian", imageSrc: "/it.svg" },
      { id: 4, title: "French", imageSrc: "/fr.svg" },
      { id: 5, title: "Croation", imageSrc: "/hr.svg" },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "learn the basics of Spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "None",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonsId: 1,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man" ?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: "/boy.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: "/girl.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_girl.mp3",
      },
      {
        id: 3,
        challengeId: 1,
        imageSrc: "/zombie.svg",
        correct: false,
        text: "la zombie",
        audioSrc: "/es_zombie.mp3",
      },
    ]);
    console.log("seeding finised");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
