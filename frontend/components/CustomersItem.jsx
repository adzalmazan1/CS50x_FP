import { ItemCard } from "./ItemCard";

export const CustomersItem = ({ item, onDelete, delOp, cardAct}) => {
    return (
        <ItemCard
            title={item.name}
            subT={item.address}
            rightContent={null}
            onDelete={onDelete}
            id={item.id}
            itemType="customer"
            delOp={delOp}
            cardAction={cardAct}
        />
    )
}
