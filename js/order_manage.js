let orders = [
  { id: "TIE-892005", name: "Kamal Perera", address: "kamalperera@gmail.com", payment: "Card", courier: "Farda Courier", item: "Computer", qty: 1, revenue: 80000, cost: 75000, addCost: 500, tracking: "4001", status: "Pending" },
  { id: "TIE-179510", name: "Raveen Silva", address: "raveensilva@gmail.com", payment: "Card", courier: "Kubiyo Courier", item: "Lap top", qty: 1, revenue: 150000, cost: 140000, addCost: 0, tracking: "4002", status: "Pending" }
];

const list = document.getElementById("ordersList");
console.log(orders[0].name);


function render() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filter = document.getElementById("filterStatus").value;

  list.innerHTML = "";

  orders.forEach((order, index) => {

     
    if (filter !== "All" && order.status !== filter) return;
    if (!(order.id + order.name + order.address).toLowerCase().includes(search)) return;

    const profit = order.revenue - order.cost - order.addCost;

    list.innerHTML += `
    <div class="order-card">


            <div class="order-head">
                    <div>
                        <b>${order.id} / ${order.name}</b><p><b>Address:</b> ${order.address}</p><p><b>Payment:</b> ${order.payment} | <b>Courier:</b> ${order.courier}</p>
                    </div>
                    <div>
                        <span class="price">LKR ${order.revenue}</span> <span class="badge">${order.status}</span>
                    </div>
            </div>
          
            <p><b>Items Ordered:</b><br>${order.item} - ${order.qty}<br><b>Tracking:</b> ${order.tracking}</p>


            <div class="profit-box">


                     <div><span>Order Revenue:</span><span>LKR ${order.revenue}</span></div>
                     <div><span>Total Items Cost:</span><span>- LKR ${order.cost}</span></div>
                     <div><span>Additional Cost:</span><span>- LKR ${order.addCost}</span></div><hr>
                     <div class="net"><span>Net Profit:</span><span>LKR ${profit}</span></div>
            </div>


             <div class="form-row">

                    <div>
                    
                    <label>Order Status</label>
                    <select onchange="changeStatus(${index}, this.value)">
                        <option ${order.status=="Pending"?"selected":""}>Pending</option>
                        <option ${order.status=="Processing"?"selected":""}>Processing</option>
                        <option ${order.status=="Delivered"?"selected":""}>Delivered</option>
                        <option ${order.status=="Cancelled"?"selected":""}>Cancelled</option>
                    </select>
                    
                    </div>
                    <div>
                    
                    <label>Additional Cost (LKR)</label>
                    <input type="number" value="${order.addCost}" onchange="changeCost(${index}, this.value)">
                    
                    </div>
                    <div>
                    
                    <label>Tracking Number</label>
                    <input type="text" value="${order.tracking}" onchange="changeTracking(${index}, this.value)">
                    </div>
      
    </div>
     
    
        <div class="btn-row">
            <button class="delete-btn" onclick="deleteOrder(${index})">Delete Order</button>
            <button class="update-btn" onclick="render()">Update Order</button>
        </div>

    </div>`;
  });
}

function changeStatus(i, v){ orders[i].status = v; render(); }
function changeCost(i, v){ orders[i].addCost = Number(v); render(); }
function changeTracking(i, v){ orders[i].tracking = v; }
function deleteOrder(i){ if(confirm("Delete this order?")){ orders.splice(i,1); render(); } }

//  ADD ORDER - PROMPT 
document.getElementById("addOrderBtn").onclick = () => {
  const name = prompt("Enter customer name:");
  if(!name) return;

  const address = prompt("Enter address / email:") || "-";
  const item = prompt("Enter item name:") || "Item";
  const qty = Number(prompt("Enter quantity:")) || 1;
  const revenue = Number(prompt("Enter Order Revenue (LKR):")) || 0;
  const cost = Number(prompt("Enter Total Items Cost (LKR):")) || 0;
  const courier = prompt("Enter courier:") || "-";
  const tracking = prompt("Enter tracking number:") || "";

  orders.push({
    id: "TIE-" + Date.now(),
    name: name,
    address: address,
    payment: "COD",
    courier: courier,
    item: item,
    qty: qty,
    revenue: revenue,
    cost: cost,
    addCost: 0,
    tracking: tracking,
    status: "Pending"
  } );

  render();
};

document.getElementById("searchInput").oninput = render;
document.getElementById("filterStatus").onchange = render;

render();