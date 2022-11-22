class ProductMst {
    #category;
    #name;
    #price;
    #image;


    constructor(category, name, price, image) {
        this.#category = category;
        this.#name = name;
        this.#price = price;
        this.#image = image;

    }

    getCategory() {return this.#category;}
    setCategory(category) {this.#category = category;}

    getName() {return this.#name;}
    setName(name) {this.#name = name;}

    getPrice() {return this.#price;}
    setPrice(price) {this.#price = price;}

    getImage() {return this.#image;}
    setImage(image) {this.#image = image;}



    getObject() {
        const obj = {
            category: this.#category,
            name: this.#name,
            price: this.#price,
            image: this.#image

        }
        return obj;
    }
}

class CommonApi {
    getCategoryList() {
        let responseResult = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/admin/product/category",
            dataType: "json",
            success: (response) => {
                responseResult = response.data;
            },
            error: (error) => {
                console.log(error);
            }
        });

        return responseResult;
    }
}

class ProductApi {
    createProductRequest(productMst) {
        let responseData = null;

        $.ajax({
            async: false,
            type: "post",
            url: "/admin/product",
            contentType: "application/json",
            data: JSON.stringify(productMst),
            dataType: "json",
            success: (response) => {
                responseData = response.data;
            },
            error: (error) => {
                console.log(error);
            }
        });
        
        return responseData;
    }

    getProductListRequest(listRequestParams) {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/admin/product",
            data: listRequestParams,
            dataType: "json",
            success: (response) => {
                responseData = response.data;
            },
            error: (error) => {
                console.log(error);
            }
        })

        return responseData;
    }
}

class RegisterEventService {
    #categorySelectObj;
    #nameInputObj;
    #priceInputObj;
    #imageInputObj;
    #registButtonObj;


    constructor() {
        this.#categorySelectObj = document.querySelector(".product-category");
        this.#nameInputObj = document.querySelector(".product-name");
        this.#priceInputObj = document.querySelector(".product-price");
        this.#imageInputObj = document.querySelector(".product-image");
        this.#registButtonObj = document.querySelector(".regist-button");
     
        // this.init();

        // this.addCategorySelectEvent();
        // this.addNameInputEvent();
        // this.addPriceInputEvent();
        // this.addImageInputEvent();
         this.addRegistButtonEvent();
    }

    // init() {
    //     this.#nameInputObj.disabled = true;
    //     this.#priceInputObj.disabled = true;
    //     this.#registButtonObj.disabled = true;
    // }

    // addCategorySelectEvent() {
    //     this.#categorySelectObj.onchange = () => {
    //         if(this.#categorySelectObj.value != "none") {
    //             this.#nameInputObj.disabled = false;
    //         }else {
    //             this.#nameInputObj.disabled = true;
    //         }
    //     }
    // }

    // addNameInputEvent() {
    //     this.#nameInputObj.onkeyup = () => {
    //         if(this.#nameInputObj.value.length != 0) {
    //             this.#priceInputObj.disabled = false;
    //         }else {
    //             this.#priceInputObj.disabled = true;
    //         }
    //     }
    // }

    addRegistButtonEvent() {
        this.#registButtonObj.onclick = () => {
            const category = this.#categorySelectObj.value;
            const name = this.#nameInputObj.value;
            const price = this.#priceInputObj.value;
            const image = this.#imageInputObj;

            const productMst = new ProductMst(
                category, name, price, image);

            const registerApi = new ProductApi();
            if(registerApi.createProductRequest(productMst.getObject())) {
                alert("상품 등록 완료");
                location.reload();
            }
        }
    }
}

class RegisterService { 
    static #instance = null;

    constructor() {
    }

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new RegisterService();
        }
        return this.#instance;
    }

    loadRegister() {
        
    }

    getCategoryList() {
        const commonApi = new CommonApi();
        const productCategoryList = commonApi.getCategoryList();

        const productCategory = document.querySelector(".product-category");
        productCategory.innerHTML = `<option value="none">상품 종류</option>`;

        productCategoryList.forEach(category => {
            productCategory.innerHTML += `
            <option value="${category.id}">${category.name}</option>
            `;
        })

    }

    setRegisterHeaderEvent() {
        new RegisterEventService();
    }
}

class ListService {
    static #instance = null;

    getInstance() {
        if(this.#instance == null) {
            this.#instance = new ListService();
        }
        return this.#instance;
    }
}

window.onload = () => {
    RegisterService.getInstance().getCategoryList();
    RegisterService.getInstance().setRegisterHeaderEvent();
}