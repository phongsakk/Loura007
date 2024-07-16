<template>
    <div class="homepage">
        <nav-bar></nav-bar>
        <div class="wrapper">
            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.homepage {
    background-color: #FFFFFF;
    height: 100vh;
}

.wrapper {
    display: flex;
}

.main-content {
    flex: 1;
    overflow: hidden;
    padding: 100px 30px 30px 30px;
    background-size: 100% 430px;
    background-repeat: no-repeat;
}

</style>