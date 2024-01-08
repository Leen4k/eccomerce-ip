
<template>
    <div style="width: 315px; height: 478px; background: #E2D8FF; border-radius: 30px; padding-top: 12px; padding-left:13px; margin-top: 14px;margin-left: 13px;">
        <div style="width: 289px; height: 328px; background: whitesmoke; border-radius: 30px; padding-top: 12px;">
            {{image}}
        </div>
        <div style="width: 315px; padding-left: 13px;">
            <div class="itemName" style="width: 252px; font-size: 24px; color: black;">{{ title }}</div>
            <div class="subName" style="width: 252px;font-size: 20px; color: #2C13AD;">{{ subTitle }}</div>
            <div style="display: flex; margin-top: 2px;">
                <div class="price" style="width: 140px;font-size: 24px; color: black;">{{ price }}</div>
                <div class="addButton" 
                style="
                width: 129px;
                height: 46px; 
                background: #470CED; 
                border-radius: 30px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                color: white; 
                padding-right: 13px;">
                {{ addButton }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "ProductCard",
    props: {
        image: Image,
        title: String,
        subTitle: String,
        price: String,
        addButton: String,
        
    },
};

</script>