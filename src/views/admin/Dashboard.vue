<template>
    <b-container>
        <br><br><br> <br><br>
        
        <h1 class="text-center">Admin Area</h1>

        <br><br>

        <b-card title="Manage Categories">
            <router-link :to="{name: 'add_category'}" class="card-link">Add</router-link>
            <router-link :to="{name: 'view_categories'}" class="card-link">View</router-link>
        </b-card>
        
        <br><br>


        <b-card title="Manage Products">
            <router-link :to="{name: 'add_product'}" class="card-link">Add</router-link>
            <router-link :to="{name: 'view_products'}" class="card-link">View</router-link>
        </b-card>

    </b-container>
</template>

<script>
export default {

    
}
</script>