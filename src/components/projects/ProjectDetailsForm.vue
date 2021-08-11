<template>
    <form>
        <div class="form-control">
            <label for="projectName">Address / Project Name:  </label>
            <input type="text" id="projectName">
        </div>
        <div class="form-control">
            <label for="projectCity">Tenant Name:  </label>
            <input type="text" id="projectCity">
        </div>
        <div class="form-control">
            <label for="projectCity">City:  </label>
            <input type="text" id="projectCity">
        </div>
    </form>
</template>

<script>
export default {
    props: ['type']
}
</script>