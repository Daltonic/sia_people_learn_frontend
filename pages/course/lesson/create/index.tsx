import LessonForm from "@/components/coursedetail/lesson/LessonForm";
import LessonHeader from "@/components/coursedetail/lesson/LessonHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import Button from "@/components/reusableComponents/Button";
import DeleteModal from "@/components/reusableComponents/DeleteModal";
import { fetchCourse, orderCourseLessons } from "@/services/backend.services";
import { ILesson } from "@/utils/type.dt";
import { GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";

const Page: NextPage<{ courseId: string; lessonsData: ILesson[] }> = ({
  courseId,
  lessonsData,
}) => {
  const [lessonsOrder, setLessonsOrder] = useState<string[]>([]);
  const [lessons, setLessons] = useState<ILesson[]>(lessonsData);
  const [loaded, setLoaded] = useState<boolean>(false);
  const router = useRouter();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const newLessons = [...lessons];
    const [removed] = newLessons.splice(sourceIndex, 1);
    newLessons.splice(destinationIndex, 0, removed);
    setLessons(newLessons);
    setLessonsOrder(newLessons.map((lesson) => lesson._id));
  };

  const handleReorder = async () => {
    await toast.promise(
      new Promise<void>((resolve, reject) => {
        orderCourseLessons(courseId, { lessonsIds: lessonsOrder })
          .then((result) => {
            setLessonsOrder([]);
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      }),
      {
        pending: "Reordering...",
        success: "Reordered successfully 👌",
        error: "Encountered error 🤯",
      }
    );
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <DashboardLayout>
        <LessonHeader
          headerHead="Create Lesson"
          headerBody="Create lesson for your Course"
        />
        <div className="space-y-6">
          <LessonForm courseId={courseId} type="create" accordionState />

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lesson-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {lessons.map((lesson: ILesson, i: number) => (
                    <Draggable
                      key={lesson._id}
                      draggableId={lesson._id}
                      index={i}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <LessonForm
                            lesson={lesson}
                            courseId={courseId}
                            type="edit"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="flex justify-start items-center space-x-2">
          {lessonsOrder.length > 0 && (
            <Button onClick={handleReorder} variant="pink">
              Reorder
            </Button>
          )}

          <Button
            onClick={() =>
              router.push({
                pathname: `/course/learn/${String(courseId)}`,
              })
            }
            variant="pinkoutline"
          >
            Watch
          </Button>
        </div>
        <DeleteModal />
      </DashboardLayout>
    )
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { course } = context.query;
  const token = context.req.cookies.accessToken;

  try {
    const courseData = await fetchCourse(course as string, token);
    const courseLessons: ILesson[] = courseData.lessons;

    return {
      props: {
        lessonsData: JSON.parse(JSON.stringify(courseLessons)) as ILesson,
        courseId: courseData._id,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        lessonsData: [],
        courseId: null,
      },
    };
  }
};
