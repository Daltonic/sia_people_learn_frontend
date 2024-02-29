import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Image from 'next/image'
import { ICourse, ILesson } from '@/utils/type.dt'
import EmptyComponent from '../reusableComponents/EmptyComponent'
import Link from 'next/link'

interface Props {
  course: ICourse
  lessons: ILesson[]
  lessonId?: string
  onReorder?: (sourceIndex: number, destinationIndex: number) => void
}

const LessonAccordion: React.FC<Props> = ({
  course,
  lessons,
  lessonId,
  onReorder,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index
    if (onReorder) {
      onReorder(sourceIndex, destinationIndex)
    }
  }

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    loaded && (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="lessons">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="border rounded-md p-2 space-y-2 md:h-[55vh] overflow-y-scroll"
            >
              <div className="mb-2 text-[#321463] text-lg font-medium ">
                Course Lessons
              </div>

              <div className="flex flex-col gap-4">
                {lessons.map((lesson, index) =>
                  onReorder ? (
                    <Draggable
                      key={lesson._id}
                      draggableId={lesson._id}
                      index={index}
                    >
                      {(provided) => (
                        <Link
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className={`flex item-center gap-3 text-[#4F547B] md:text-sm p-2 rounded-sm cursor-pointer ${
                            lesson._id === lessonId
                              ? 'bg-slate-200'
                              : 'bg-slate-50'
                          }`}
                          href={{
                            pathname: `/course/learn/lesson/${lesson._id}`,
                            query: { courseId: course._id },
                          }}
                        >
                          <div>
                            <Image
                              height={100}
                              width={100}
                              src={
                                course.imageUrl || '/images/general/cardimg.svg'
                              }
                              alt="Course Image"
                              className="w-14 h-10 object-cover rounded-md"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="">Duration: {lesson.duration.toFixed(2)} mins</p>
                          </div>
                        </Link>
                      )}
                    </Draggable>
                  ) : (
                    <Link
                      key={lesson._id}
                      href={{
                        pathname: `/course/learn/lesson/${lesson._id}`,
                        query: { courseId: course._id },
                      }}
                      className={`flex item-center gap-3 text-[#4F547B] md:text-sm p-2 rounded-sm cursor-pointer ${
                        lesson._id === lessonId ? 'bg-slate-200' : 'bg-slate-50'
                      }`}
                    >
                      <div>
                        <Image
                          height={100}
                          width={100}
                          src={course.imageUrl || '/images/general/cardimg.svg'}
                          alt="Course Image"
                          className="w-14 h-10 object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="">Duration: {lesson.duration.toFixed(2)} mins</p>
                      </div>
                    </Link>
                  )
                )}
                {provided.placeholder}
              </div>

              {lessons.length < 1 && (
                <EmptyComponent
                  title="No lessons available for this course"
                  buttonText="Go Back"
                />
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  )
}

export default LessonAccordion
