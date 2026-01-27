import { useActionState } from "react";

const isNotEmpty = function (data) {
    return data.length > 0;
};

export function NewOpinion() {
    const newOpinionAction = function (prevState, formData) {
        console.log(formData.get("userName"));
        const userName = formData.get("userName");
        const title = formData.get("title");
        const body = formData.get("body");

        let errorMsg = "";

        if (!isNotEmpty(userName) || !isNotEmpty(title) || !isNotEmpty(body)) {
            errorMsg = "Enter all fields";
            // console.log(errorMsg);
        }
        if (errorMsg.length > 0) {
            return {
                error: errorMsg,
                enteredValues: {
                    userName,
                    title,
                    body,
                },
            };
        }

        return { error: null };
    };

    const [state, submit] = useActionState(newOpinionAction, { error: null });

    return (
        <div id="new-opinion">
            <h2>Share your opinion!</h2>
            <form action={submit}>
                <p>{state.error}</p>
                <div className="control-row">
                    <p className="control">
                        <label htmlFor="userName">Your Name</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            defaultValue={state.enteredValues?.userName}
                        />
                    </p>

                    <p className="control">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={state.enteredValues?.title}
                        />
                    </p>
                </div>
                <p className="control">
                    <label htmlFor="body">Your Opinion</label>
                    <textarea
                        id="body"
                        name="body"
                        rows={5}
                        defaultValue={state.enteredValues?.body}
                    ></textarea>
                </p>

                <p className="actions">
                    <button type="submit">Submit</button>
                </p>
                <div className="errors">
                    {state.error?.length > 0 && <p>{state.error}</p>}
                </div>
            </form>
        </div>
    );
}
