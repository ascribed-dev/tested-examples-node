// :snippet-start: order-total
interface Line {
  item: string;
  price: number;
  quantity: number;
}

function total(lines: Line[]): number {
  return lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
}

const order: Line[] = [
  { item: "Notebook", price: 4.5, quantity: 2 },
  { item: "Pen", price: 1.25, quantity: 4 },
];

for (const line of order) {
  console.log(`${line.quantity} x ${line.item}`);
}
console.log(`Total: ${total(order).toFixed(2)}`);
// :snippet-end:
