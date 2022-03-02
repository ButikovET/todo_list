import React from "react";

const TodoFotter = ({itemsLength, activeLength, completedLength,  onCompletedShowing, onActiveShowing, onAllShowing, clearCompleted, showAll, showActive, showCompleted}) => {

    return (
        <div className="d-flex justify-content-between px-3 border_footer">
            <div className="align-self-center">
                {showAll&&itemsLength===1?`${itemsLength} item left`:showAll&&`${itemsLength} items left`}
                {showActive&&activeLength===1?`${activeLength} active item left`:showActive&&`${activeLength} active items left`}
                {showCompleted&&completedLength===1?`${completedLength} completed item left`:showCompleted&&`${completedLength} completed items left`}
            </div>
            <div className="d-flex align-self-center justify-content-center">
                <div className={`align-self-center p-2 pointer buttonBorder ${showAll&&' targeted'}`} onClick={onAllShowing}>All</div>
                <div className={`align-self-center p-2 pointer buttonBorder ${showActive&&' targeted'}`} onClick={onActiveShowing}>Active</div>
                <div className={`align-self-center p-2 pointer buttonBorder ${showCompleted&&' targeted'}`} onClick={onCompletedShowing}>Completed</div>
            </div>
            <div className="align-self-center p-2 pointer buttonBorder" onClick={clearCompleted}>Clear completed</div>
        </div>
    )
}

export default TodoFotter;