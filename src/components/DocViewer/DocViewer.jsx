import './docViewer.scss'
import {AnnotationViewer} from "react-mindee-js";
import {useState} from "react";

const onShapeClicked = (shape) => {
    document.getElementById(shape.id).scrollIntoView();
}

function DocViewer({images, shapes, onShapeMouseEntered, onShapeMouseLeft, getStage}) {
    const [activeImage, setActiveImage] = useState(0)
    return (
        <div className="col-md-5">
            <div className="row">
                <div className="annotation-viewer col-md-12">
                    {
                        images.length > 0 &&
                        <AnnotationViewer
                            options={{
                                enableSelection: false,
                                onMouseLeave: (polygon) => {
                                    const layer = polygon.getLayer()
                                    polygon.setAttr('fill', 'transparent')
                                    layer?.batchDraw()
                                },
                                onMouseEnter: (polygon) => {
                                    polygon.setAttr('fill', polygon.getAttr('stroke'))
                                    polygon.setAttr('opacity', 0.5)
                                    polygon.draw()
                                },
                                shapeConfig: {
                                    strokeWidth: 4,
                                    listening: true,
                                },
                            }}
                            style={{width: "100%", height: "100%", background: "black"}}
                            data={{image: images[activeImage], shapes: shapes[activeImage]}}
                            onShapeMouseEnter={onShapeMouseEntered}
                            onShapeMouseLeave={onShapeMouseLeft}
                            onShapeClick={onShapeClicked}
                            getStage={getStage}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default DocViewer;
