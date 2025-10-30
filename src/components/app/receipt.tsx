import { Order, GST_RATE } from "@/app/staff/dashboard/page";
import { Separator } from "@/components/ui/separator";

type ReceiptProps = {
  order: Order;
};

export function Receipt({ order }: ReceiptProps) {
  const subtotal = order.items.reduce(
    (acc, { item, quantity }) => acc + item.price * quantity,
    0
  );
  const gstAmount = subtotal * GST_RATE;
  const total = subtotal + gstAmount;

  return (
    <div className="bg-white text-black font-mono p-4 max-w-sm mx-auto">
      <div className="text-center">
        <h2 className="text-xl font-bold">Shivraj Restaurant</h2>
        <p className="text-xs">Your Branch Name Here</p>
        <p className="text-xs">GSTIN: 27AABCU9603R1ZM</p>
        <Separator className="my-2 border-dashed border-black" />
        <p className="text-sm font-bold">Tax Invoice</p>
      </div>

      <Separator className="my-2 border-dashed border-black" />

      <div className="text-xs">
        <div className="flex justify-between">
          <span>Order ID:</span>
          <span>{order.id.slice(-6)}</span>
        </div>
        <div className="flex justify-between">
          <span>Table:</span>
          <span>{order.tableNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span>
            {order.completedAt
              ? new Date(order.completedAt).toLocaleDateString("en-IN")
              : "-"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Time:</span>
          <span>
            {order.completedAt
              ? new Date(order.completedAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "-"}
          </span>
        </div>
      </div>

      <Separator className="my-2 border-dashed border-black" />

      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-dashed border-black">
            <th className="text-left font-semibold">ITEM</th>
            <th className="text-center font-semibold">QTY</th>
            <th className="text-right font-semibold">PRICE</th>
            <th className="text-right font-semibold">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map(({ item, quantity }) => (
            <tr key={item.id}>
              <td className="text-left">{item.name}</td>
              <td className="text-center">{quantity}</td>
              <td className="text-right">{item.price.toFixed(2)}</td>
              <td className="text-right">{(item.price * quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Separator className="my-2 border-dashed border-black" />

      <div className="text-xs space-y-1">
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal</span>
          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>CGST (2.5%)</span>
          <span>₹{(gstAmount / 2).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>SGST (2.5%)</span>
          <span>₹{(gstAmount / 2).toFixed(2)}</span>
        </div>
      </div>
      
      <Separator className="my-2 border-dashed border-black" />

      <div className="flex justify-between font-bold text-sm">
        <span>Grand Total</span>
        <span>₹{Math.round(total).toFixed(2)}</span>
      </div>

      <Separator className="my-2 border-dashed border-black" />

      <div className="text-center text-xs mt-4">
        <p>Thank you for visiting!</p>
        <p>Come again soon!</p>
      </div>
    </div>
  );
}
