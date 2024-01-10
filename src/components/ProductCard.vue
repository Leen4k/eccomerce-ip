<template>
    <div class="product-card" style="display: list-item;">
      <div class="image-container">
        <div class="image-frame">
          <img :src="image" alt="title">
          <!-- <img src="../assets/Untitled design (4) 1.png" alt=""> -->
        </div>
      </div>
      <div class="product-details">
        <div class="item-name">{{ title }}</div>
        <div class="sub-name">{{ subTitle }}</div>
        <div class="price-and-button">
          <div class="price">{{ price }}</div>
          <div class="add-button">
            <slot name="addButton">Add</slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .product-card {
    width: 315px;
    height: 478px;
    background: #E2D8FF;
    border-radius: 30px;
    padding-top: 12px;
    padding-left: 13px;
    margin-top: 14px;
    margin-left: 13px;
    display: flex;
  }
  
  .image-container {
    width: 289px;
    height: 328px;
    background: whitesmoke;
    border-radius: 30px;
    
    position: relative;
  }
  
  .image-frame img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    object-fit: cover;
    position: absolute;
  }
  
  .product-details {
    width: 100%;
    padding-left: 13px;
  }
  
  .item-name {
    width: 252px;
    font-size: 24px;
    color: black;
  }
  
  .sub-name {
    width: 252px;
    font-size: 20px;
    color: #2C13AD;
  }
  
  .price-and-button {
    display: flex;
    margin-top: 2px;
  }
  
  .price {
    width: 140px;
    font-size: 24px;
    color: black;
  }
  
  .add-button {
    width: 129px;
    height: 46px;
    background: #470CED;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding-right: 13px;
  }
  </style>
  
  <script>
  export default {
    name: "ProductCard",
    props: {
      image: String,
      title: String,
      subTitle: String,
      price: String,
    },
  };
  </script>
  