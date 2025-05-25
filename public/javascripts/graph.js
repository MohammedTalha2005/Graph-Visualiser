const container = document.getElementById('network');
const nodes=new vis.DataSet(rawnodes);
const edges=new vis.DataSet(rawedges);
const data = {nodes,edges};
const options = {
  nodes: {
    size: 25,
    borderWidth: 2,
    borderWidthSelected: 4,
    color: {
      background: '#00BFFF',
      border: '#1E90FF',
      highlight: {
        background: '#87CEFA',
        border: '#104E8B'
      },
      hover: {
        background: '#B0E0E6',
        border: '#4682B4'
      }
    },
    font: {
      color: 'white',
      size: 16,
      face: 'Segoe UI',
      bold: {
        color: 'white',
        size: 18
      }
    }
  },
  edges: {
    color: {
      color: '#A9A9A9',
      highlight: '#FF8C00',
      hover: '#00FA9A'
    },
    width: 2,
    selectionWidth: 3,
    hoverWidth: 3,
    smooth: {
      type: 'cubicBezier',
      forceDirection: 'horizontal',
      roundness: 0.4
    },
  },
  physics: {
    enabled: true,
    stabilization: true
  },
  interaction: {
    zoomView: true,
    dragView: false,
    dragNodes: false,
    hover: true
  }
};
const network = new vis.Network(container, data, options);
// Start button functionality
const startip=document.getElementById('startnode');
const op = document.getElementById("dfsresult");
const algo=document.getElementById('opselect');
const resultTitle = document.getElementById("result-title");
// creating adjacency list
  let adj = [];
  for (let i = 0; i <= rawnodes.length; i++) {
    adj.push([]);
  }
  for (const ele of rawedges) {
    let u = Number(ele.from),
      v = Number(ele.to);
    adj[u].push(v);
    adj[v].push(u);
  }
document.getElementById('startbtn').addEventListener('click',async(e)=>{
   e.preventDefault();
   let n=nodes.length,s=Number(startip.value);
   let visited=Array(n+1).fill(0);
   op.textContent="";
   console.log(algo.value);
   if(algo.value=='dfs'){
    resultTitle.textContent='DFS Result';
    await dfs(s, visited, adj);
   }else{
    resultTitle.textContent = "BFS Result";
    await bfs(s,visited,adj);
   }
   await delay(1000);
   for(let node=1;node<=n;node++){
    nodes.update({
      id: String(node),
      color: {
        background: "#00BFFF",
        border: "#1E90FF",
      },
      borderWidth: 2,
      font: {
        color: "white",
      },
    });
   }
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//  dfs
async function dfs(node,visited,adj){
   if(visited[node])return;
   await delay(1000);
    nodes.update({
      id: String(node),
      color: {
        background: "greenyellow",
        border: "green",
      },
      borderWidth: 4,
      font: {
        color: "red",
      },
    });
    op.textContent = op.textContent + `${node} -> `;
   visited[node]=1;
   for (const ele of adj[node]) {
       await dfs(ele,visited,adj);
   }
}
//  queue for bfs 
class Queue {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }

  enqueue(element) {
    this.items[this.rear] = element;
    this.rear++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return item;
  }

  peek() {
    return this.items[this.front];
  }

  isEmpty() {
    return this.rear === this.front;
  }

  size() {
    return this.rear - this.front;
  }
}

// bfs
async function bfs(s,visited,adj) {
   const q=new Queue();
   q.enqueue(s);
   visited[s]=1;
   while(!q.isEmpty()){
    let node=q.dequeue();
    await delay(1000);
    nodes.update({
      id: String(node),
      color: {
        background: "greenyellow",
        border: "green",
      },
      borderWidth: 4,
      font: {
        color: "red",
      },
    });
    op.textContent = op.textContent + `${node} -> `;
    for (const ele of adj[node]) {
      if(!visited[ele]){
        q.enqueue(ele);
        visited[ele]=1;
      }
    }
   }
}
