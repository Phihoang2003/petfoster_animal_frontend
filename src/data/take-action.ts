import { IProduct } from "@/configs/interface";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import {
  faRightLeft,
  faRocket,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { links } from "./links";

export const takeActionData = {
  overview: [
    {
      icon: faTruckFast,
      title: "FREE SHIP",
      des: "From 500.000",
    },
    {
      icon: faRightLeft,
      title: "SAFE BUY",
      des: "30 days return",
    },
    {
      icon: faRocket,
      title: "ONLINE SUPPORT",
      des: "Support 24/7",
    },
    {
      icon: faCreditCard,
      title: "PAYMENT METHOD",
      des: "Support all payment",
    },
  ],
  categoriesOverview: [
    {
      id: 1,
      link: links.products + "products?type=Bird+food",
      thumbnail:
        "https://media.istockphoto.com/id/1182224713/vi/anh/%E1%BA%A3nh-ch%E1%BB%A5p-%C4%91%E1%BA%A7u-v%E1%BA%B9t-%C4%91u%C3%B4i-d%C3%A0i-xanh-v%C3%A0-v%C3%A0ng-ho%E1%BA%B7c-xanh-v%C3%A0-v%C3%A0ng-con-v%E1%BA%B9t-xinh-%C4%91%E1%BA%B9p-v%E1%BB%9Bi-l%C3%B4ng-m%C3%A0u-v%C3%A0ng.jpg?s=612x612&w=0&k=20&c=kC7D6rfS2qF5Nwv0fyLfH-bxiPnDDjevDPoXG3aPVGU=",
    },
    {
      id: 2,
      link: links.products + "products?type=Cat+food",
      thumbnail:
        "https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000",
    },
    {
      id: 3,
      link: links.products + "products?type=Dog+food",
      thumbnail:
        "https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-2_1562-691.jpg",
    },
    {
      id: 4,
      link: links.products + "products?type=Rabbit+Food",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDq2UzWA47t2_0oYZGJGOQXuzXIoTsNW7IDihGN_7g6ciaiyIxtcs8eaAcwMz_aDSmFy8&usqp=CAU",
    },
    {
      id: 5,
      link: links.products + "products?type=Mouse+food",
      thumbnail:
        "https://meohaychoban.com/wp-content/uploads/2021/05/hamster-mau-golden.jpg",
    },
  ],
  banners: [
    {
      content: "THE FOOD FOR CATS",
      image: "/images/b1.svg",
      link: links.products + "products?type=Cat+food",
    },
    {
      content: "BEST SELLER PRODUCTS",
      image: "/images/b2.svg",
      link: "#best-sellers",
    },
    {
      content: "THE FOOD FOR DOGS",
      image: "/images/b3.svg",
      link: links.products + "products?type=Dog+food",
    },
    { content: "ADOPT PETS", image: "/images/b4.svg", link: "/adopt" },
    {
      content: "THE TOYS FOR DOGS",
      image: "/images/b5.svg",
      link: links.products + "products?type=Dog+food",
    },
  ],
};

export const takeActionPageData = {
  newArrivals: [
    {
      id: 1,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/362/345/products/xsmalladult-a81506df-ac29-4e87-8bd8-153192be5792.jpg?v=1571057515367",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 2,
      brand: "Zenith",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/56f71624-5d8b-4bcb-87ad-c23832bd1c46.jpg?v=1640251015190",
      name: "Hạt Mềm Cho Chó Trưởng Thành Zenith Adult",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 3,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://product.hstatic.net/200000391405/product/bnm5005_344c38b9ad9346bbb78c6a57c536892e.jpg",
      name: "Thức Ăn Cho Chó Mọi Lứa Tuổi Hữu Cơ Natural Core M50 Gà & Cá Hồi",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 4,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 5,
      brand: "Kagewl Hesin",
      size: [200, 350, 700, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 4,
    },
    {
      id: 6,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 7,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 3,
    },
    {
      id: 8,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 4,
    },
  ] as IProduct[],
  bestSellers: {
    data: [
      {
        id: 1,
        brand: "Royal Canin",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://bizweb.dktcdn.net/100/362/345/products/xsmalladult-a81506df-ac29-4e87-8bd8-153192be5792.jpg?v=1571057515367",
        name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
        oldPrice: 39000,
        price: 27000,
        rating: 5,
      },
      {
        id: 2,
        brand: "Zenith",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://bizweb.dktcdn.net/100/438/021/products/56f71624-5d8b-4bcb-87ad-c23832bd1c46.jpg?v=1640251015190",
        name: "Hạt Mềm Cho Chó Trưởng Thành Zenith Adult",
        oldPrice: 39000,
        price: 27000,
        rating: 5,
      },
      {
        id: 3,
        brand: "Royal Canin",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://product.hstatic.net/200000391405/product/bnm5005_344c38b9ad9346bbb78c6a57c536892e.jpg",
        name: "Thức Ăn Cho Chó Mọi Lứa Tuổi Hữu Cơ Natural Core M50 Gà & Cá Hồi",
        oldPrice: 39000,
        price: 27000,
        rating: 5,
      },
      {
        id: 4,
        brand: "Royal Canin",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
        name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
        oldPrice: 39000,
        price: 27000,
        rating: 5,
      },
      {
        id: 5,
        brand: "Royal Canin",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://bizweb.dktcdn.net/100/362/345/products/xsmalladult-a81506df-ac29-4e87-8bd8-153192be5792.jpg?v=1571057515367",
        name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
        oldPrice: 39000,
        price: 27000,
        rating: 5,
      },
      {
        id: 6,
        brand: "Zenith",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://bizweb.dktcdn.net/100/438/021/products/56f71624-5d8b-4bcb-87ad-c23832bd1c46.jpg?v=1640251015190",
        name: "Hạt Mềm Cho Chó Trưởng Thành Zenith Adult",
        oldPrice: 39000,
        price: 27000,
        rating: 5,
      },
      {
        id: 7,
        brand: "Royal Canin",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://product.hstatic.net/200000391405/product/bnm5005_344c38b9ad9346bbb78c6a57c536892e.jpg",
        name: "Thức Ăn Cho Chó Mọi Lứa Tuổi Hữu Cơ Natural Core M50 Gà & Cá Hồi",
        oldPrice: 39000,
        price: 27000,
        rating: 5,
      },
      {
        id: 8,
        brand: "Royal Canin",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
        name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
        oldPrice: 39000,
        price: 27000,
        rating: 4,
      },
      {
        id: 9,
        brand: "Royal Canin",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
        name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
        oldPrice: 39000,
        price: 27000,
        rating: 3,
      },
      {
        id: 10,
        brand: "Royal Canin",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
        name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
        oldPrice: 39000,
        price: 27000,
        rating: 5,
      },
      {
        id: 11,
        brand: "Royal Canin",
        size: [200, 350, 400, 1000],
        discount: 10,
        image:
          "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
        name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
        oldPrice: 39000,
        price: 27000,
        rating: 5,
      },
    ] as IProduct[],
    pages: 10,
  },
  recents: [
    {
      id: 1,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/362/345/products/xsmalladult-a81506df-ac29-4e87-8bd8-153192be5792.jpg?v=1571057515367",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 2,
      brand: "Zenith",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/56f71624-5d8b-4bcb-87ad-c23832bd1c46.jpg?v=1640251015190",
      name: "Hạt Mềm Cho Chó Trưởng Thành Zenith Adult",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 3,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://product.hstatic.net/200000391405/product/bnm5005_344c38b9ad9346bbb78c6a57c536892e.jpg",
      name: "Thức Ăn Cho Chó Mọi Lứa Tuổi Hữu Cơ Natural Core M50 Gà & Cá Hồi",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 4,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 5,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/362/345/products/xsmalladult-a81506df-ac29-4e87-8bd8-153192be5792.jpg?v=1571057515367",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 6,
      brand: "Zenith",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/56f71624-5d8b-4bcb-87ad-c23832bd1c46.jpg?v=1640251015190",
      name: "Hạt Mềm Cho Chó Trưởng Thành Zenith Adult",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 7,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://product.hstatic.net/200000391405/product/bnm5005_344c38b9ad9346bbb78c6a57c536892e.jpg",
      name: "Thức Ăn Cho Chó Mọi Lứa Tuổi Hữu Cơ Natural Core M50 Gà & Cá Hồi",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 8,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 4,
    },
    {
      id: 9,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 3,
    },
    {
      id: 10,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
    {
      id: 11,
      brand: "Royal Canin",
      size: [200, 350, 400, 1000],
      discount: 10,
      image:
        "https://bizweb.dktcdn.net/100/438/021/products/705569d7-86fa-40a7-ae95-becd17a5fa31.jpg?v=1640251981283",
      name: "Hạt Royal Canin X-Small Adult Cho Chó Trưởng Thành Giống Siêu Nhỏ",
      oldPrice: 39000,
      price: 27000,
      rating: 5,
    },
  ] as IProduct[],
};
