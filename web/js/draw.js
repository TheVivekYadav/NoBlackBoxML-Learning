const draw = {};

draw.path=(context,path,color="black") => {
    context.strokeStyle=color;
    context.lineWidth=3;
    context.lineCap="round";
    context.beginPath();
    context.moveTo(...path[0]);
    path.forEach((point,index) => {
        context.lineTo(...point);
    })
    context.lineCap="round";
    context.lineJoin="round";
    context.stroke();
    context.closePath();
    
}

draw.paths=(context,paths,color="black") => {
    paths.forEach((path) => {
        draw.path(context,path,color);
    })
}