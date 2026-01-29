import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";

const isNotEmpty = function (data) {
    return data.length > 0;
};

export function NewOpinion() {
    const { addOpinion } = use(OpinionsContext);

    const newOpinionAction = async function (prevState, formData) {
        const userName = formData.get("userName");
        const title = formData.get("title");
        const body = formData.get("body");
        const province = formData.get("province");
        const colors = formData.getAll("color");

        let errorMsg = {};

        if (!isNotEmpty(userName)) {
            errorMsg.nameMsg = "Enter user name";
        }
        if (!isNotEmpty(title)) {
            errorMsg.titleMsg = "Enter a title";
        }
        if (!isNotEmpty(body)) {
            errorMsg.bodyMsg = "Enter a message";
        }
        if (province === "select") {
            errorMsg.provinceMsg = "Choose a Province";
        }
        if (colors.length === 0) {
            errorMsg.colorMsg = "Select one or more color";
        }

        if (Object.keys(errorMsg).length > 0) {
            return {
                error: errorMsg,
                enteredValues: {
                    userName,
                    title,
                    body,
                    province,
                    colors,
                },
            };
        }

        await addOpinion({ userName, title, body, province, colors });
        return { error: null };
    };

    const [state, submit] = useActionState(newOpinionAction, { error: null });

    return (
        <div id="new-opinion">
            <h2>Share your opinion!</h2>
            <form action={submit}>
                <div className="control-row">
                    <div className="control">
                        <label htmlFor="userName">Your Name</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            defaultValue={state.enteredValues?.userName}
                        />
                        <p className="errors">{state.error?.nameMsg}</p>
                    </div>

                    <div className="control">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={state.enteredValues?.title}
                        />
                        <p className="errors">{state.error?.titleMsg}</p>
                    </div>
                </div>
                <div className="control">
                    <label htmlFor="body">Your Opinion</label>
                    <textarea
                        id="body"
                        name="body"
                        rows={5}
                        defaultValue={state.enteredValues?.body}
                    ></textarea>
                    <p className="errors">{state.error?.bodyMsg}</p>
                </div>

                {/* COLORS */}
                <div>
                    <div className="control">
                        <label>Choose one or more color</label>
                        <div
                            style={{
                                border: "2px solid red",
                                backgroundColor: "#ff0000b8",
                            }}
                            className="control"
                        >
                            <label htmlFor="red">Red</label>
                            <input
                                id="red"
                                name="color"
                                type="checkbox"
                                value="red"
                                defaultChecked={state.enteredValues?.colors.includes(
                                    "red",
                                )}
                            />
                        </div>
                        <div
                            style={{
                                border: "2px solid blue",
                                backgroundColor: "#0000ffa6",
                            }}
                        >
                            <label htmlFor="blue">Blue</label>
                            <input
                                id="blue"
                                name="color"
                                type="checkbox"
                                value="blue"
                                defaultChecked={state.enteredValues?.colors.includes(
                                    "blue",
                                )}
                            />
                        </div>
                        <div
                            style={{
                                border: "2px solid yellow",
                                backgroundColor: "#ffff00b5",
                            }}
                        >
                            <label htmlFor="yellow">Yellow</label>
                            <input
                                id="yellow"
                                name="color"
                                type="checkbox"
                                value="yellow"
                                defaultChecked={state.enteredValues?.colors.includes(
                                    "yellow",
                                )}
                            />
                        </div>
                    </div>
                    <p className="errors">{state.error?.colorMsg}</p>
                </div>

                {/* PROVINCE */}
                <div className="control">
                    <label htmlFor="province">Choose your province</label>
                    <select id="province" name="province">
                        <option value="select">Select a province</option>
                        <option value="Québec">Québec</option>
                        <option value="Ontario">Ontario</option>
                    </select>
                    <p className="errors">{state.error?.provinceMsg}</p>
                </div>

                <p className="actions">
                    <button type="submit">Submit</button>
                </p>
            </form>
        </div>
    );
}
