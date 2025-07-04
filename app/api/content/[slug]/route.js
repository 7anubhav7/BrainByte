import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Curriculum from "@/models/Curriculum";

export async function GET(req, context) {
  await dbConnect();
  const slug = context?.params?.slug;
  if (!slug || typeof slug !== "string") {
    return NextResponse.json(
      { err: "Slug missing or faulty" },
      { status: 500 }
    );
  }

  try {
    let curriculum = await Curriculum.findOne({
      "sections.lectures.slug": slug,
    });
    if (!curriculum) {
      const curriculum = await Curriculum.findOne({ slug });
      if (!curriculum) {
        return NextResponse.json({ err: "Curriculum not found" });
      }

      const firstSection = curriculum.sections[0];
      if (!firstSection) {
        return NextResponse.json(
          { err: "No section found in curriculum" },
          { status: 404 }
        );
      }
      const firstLecture = firstSection.lectures[0];

      if (!firstLecture) {
        return NextResponse.json(
          { err: "No lecture in first lecutre" },
          { status: 404 }
        );
      }

      return NextResponse.json(firstLecture);
    }

    let matchingLecture = null;
    for (const section of curriculum.sections) {
      const lecture = section.lectures.find(
        (Lecture) => Lecture?.slug === slug
      );

      if (lecture) {
        matchingLecture = {
          ...lecture.doc,
        };
        break;
      }
    }

    if (!matchingLecture) {
      return NextResponse.json(
        { err: "Lecture not in sections" },
        { status: 404 }
      );
    }
    console.log(matchingLecture);
    return NextResponse.json(matchingLecture);
  } catch (error) {
    console.log("Error from GET for content page----", error);
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
