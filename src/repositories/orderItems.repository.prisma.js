export function createOrderItemsRepositoryPrisma() {
    return {
        async create(tx, data) {
            return tx.orderItem.create({
                data: {
                    orderId: data.orderId,
                    productId: data.productId,
                    qty: data.qty,
                    price: data.price,
                },
            });
        },
    };
}
