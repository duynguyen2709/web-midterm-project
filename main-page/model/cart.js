class Cart {
    constructor(oldCart) {
        this.count = oldCart.count || 0;
        this.add = function () {
            this.count++;
        };
    }
};  