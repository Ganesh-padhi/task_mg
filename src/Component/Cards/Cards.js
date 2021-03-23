import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Card from "./Card/Card";
import { NavLink } from "react-router-dom";
const Cards = ({cardData, filterdata,cardLabels}) => {
    const status = cardLabels.filter((label) => label.title == filterdata)[0]
    let items = []
    if (status && cardData) {
        items = cardData.filter((item) => item.label == status._id)
    }
    return (
        items.map((item, index) => {
            return (
                <Draggable draggableId={item._id} key={item._id} index={index}>
                    {(provided) => (
                        <tbody ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <tr>
                                <td>
                                    <NavLink style={{ color: "black" }} to={"/detail_task?id=" + item._id}><Card data={item} /></NavLink>
                                </td>
                            </tr></tbody>
                    )}
                </Draggable>
            )
        })
    )
}

export default Cards