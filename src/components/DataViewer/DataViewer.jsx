import './dataViewer.scss'
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import loaderGIF from "../../assets/mindee-logo.gif"

function DataViewer({invoiceData, activeFeature}) {
    const [line_items, setline_items] = useState(invoiceData)
    useEffect(() => {
        setline_items(invoiceData)
    }, [invoiceData])
    return (
        <div className="col-md-8">
            {
                invoiceData ?
                    <div className="form-container pb-1">
                        <div className="pb-1">
                            <b>Invoice Number:</b> {invoiceData.invoice_number.value}&nbsp;
                            <b>Date:</b> {invoiceData.invoice_date.value}&nbsp;
                            <b>Subtotal:</b> {invoiceData.total_excl.value}&nbsp;
                            <b>Total:</b> {invoiceData.total_incl.value}
                        </div>
                        <div className="row pb-3">
                            <div className="col">
                                <b>Supplier: </b>
                                {invoiceData.supplier.value}<br/>
                                {invoiceData.supplier_address.value}
                            </div>
                            <div className="col">
                                <b>Customer: </b>
                                {invoiceData.customer_name.value}&nbsp;
                                {invoiceData.customer_company_registration.value}&nbsp;
                                {invoiceData.company_number.value}<br/>
                                {invoiceData.customer_address.value}
                            </div>
                        </div>
                        <div>
                            <Table striped bordered hover
                                   style={{fontSize: "13px", overflow: "overlay", maxHeight: "500px"}}>
                                <thead>
                                <tr>
                                    <th>item id</th>
                                    <th>description</th>
                                    <th>unit of measure</th>
                                    <th>ordered quantity</th>
                                    <th>unit price</th>
                                    <th>total amount</th>
                                    <th>discount</th>
                                    <th>deposit</th>
                                    <th>pack size</th>
                                    <th>brand</th>
                                    <th>sku</th>
                                    <th>upc</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    invoiceData.line_items.map((obj, k) =>
                                        <tr className={activeFeature === k ? "active-feature" : ""}>
                                            <td>{obj.item_id.content}</td>
                                            <td>{obj.description.content}</td>
                                            <td>{obj.size_unit.content}</td>
                                            <td>{obj.quantity.content}</td>
                                            <td>{obj.unit_price.content}</td>
                                            <td>{obj.price_amount.content}</td>
                                            <td>{obj.discount.content}</td>
                                            <td>{obj.deposit.content}</td>
                                            <td>{obj.pack_size.content}</td>
                                            <td>{obj.brand.content}</td>
                                            <td>{obj.sku.content}</td>
                                            <td>{obj.upc.content}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    :
                    <div>
                        <img src={loaderGIF} alt=""/>
                    </div>
            }
        </div>
    );
}

export default DataViewer;
