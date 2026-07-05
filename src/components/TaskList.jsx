import TaskItem from "./TaskItem";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

function TaskList({
  filteredTasks,
  completeTask,
  deleteTask,
  editTask,
  handleDragEnd,
}) {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
          >
            {/* EMPTY STATE */}
            {filteredTasks.length === 0 && (
              <p className="empty">No Tasks Found</p>
            )}

            {/* TASK LIST */}
            {filteredTasks.map((item, index) => (
             <Draggable
              key={item._id}
              draggableId={item._id.toString()}
              index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      item={item}
                      completeTask={completeTask}
                      deleteTask={deleteTask}
                      editTask={editTask}
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
  );
}

export default TaskList;