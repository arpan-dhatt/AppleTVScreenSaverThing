
IMAGE_DIR = "images"
image_objects = []

function onLoad() {
    fetch('images/images.json')
    .then(response => response.json())
    .then(data => setup_images(data));
}

function setup_images(json_data) {
    console.log(json_data)
    for (let i = 0; i < json_data.images.length; i++) {
        filepath = IMAGE_DIR+"/"+json_data.images[i].filename
        let parent = document.getElementsByClassName("floating-image-container")[0]
        parent.innerHTML += '<img id="'+filepath+'" class="floating-image" src="'+filepath+'" alt="'+filepath+'">'
        let xpos = Math.floor(Math.random()*parent.clientWidth)-100
        let ypos = Math.floor(Math.random()*parent.clientHeight)-200
        image_objects.push({id:filepath, x: xpos, y: ypos, z: Math.random()/2+0.1})
        document.getElementById(filepath).style.left = xpos + "px"
    }
    console.log(image_objects)
}

window.requestAnimationFrame(step)

function step() {
    for (let i = 0; i < image_objects.length; i++) {
        element = document.getElementById(image_objects[i].id)
        element.style.transform = "translateY("+Math.floor(image_objects[i].y) + "px)"
        image_objects[i].y += image_objects[i].z*2
        if (image_objects[i].y > element.parentElement.clientHeight+400) {
            image_objects[i].y = -element.clientHeight-300
            console.log(element.clientHeight)

            image_objects[i].x = Math.floor(Math.random()*window.innerWidth)-100
            element.style.left = image_objects[i].x + "px"
        }
    }
    window.requestAnimationFrame(step)
}