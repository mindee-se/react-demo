import './docViewer.scss'
import {AnnotationViewer} from "react-mindee-js";
import {useState} from "react";

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
                                selectionRectConfig: {
                                    fill: 'rgba(0,0,255,0.5)',
                                },
                                onMouseLeave: (polygon) => {
                                    const layer = polygon.getLayer()
                                    polygon.setAttr('fill', 'transparent')
                                    layer?.batchDraw()
                                },
                                onMouseEnter: (polygon) => {
                                    const strokeColor = polygon.getAttr('stroke')
                                    polygon.setAttr('fill', `${strokeColor}40`)
                                    polygon.draw()
                                },
                                shapeConfig: {
                                    stroke: '#ff0000',
                                    strokeWidth: 2,
                                    listening: true,
                                },
                            }}
                            style={{width: "100%", height: "100%", background: "black"}}
                            data={{image: images[activeImage], shapes: shapes[activeImage]}}
                            onShapeMouseEnter={onShapeMouseEntered}
                            onShapeMouseLeave={onShapeMouseLeft}
                            getStage={getStage}
                        />
                    }
                </div>
            </div>
        </div>
    );
}

export default DocViewer;
