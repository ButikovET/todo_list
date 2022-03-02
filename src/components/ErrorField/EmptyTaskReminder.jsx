import React from "react";

const EmptyTaskReminder = () => {
    return(
        <div className="taskReminder p-3">
            <p className="taskReminder_text">Task should contain as minimum 1 symbol,</p>
            <p className="taskReminder_text">plase add some text (spases will be cutted)</p>
        </div>
    )
}

export default EmptyTaskReminder;