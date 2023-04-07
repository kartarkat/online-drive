import { v4 as uuidv4 } from 'uuid'

function useTreeTraversal() {

  const insertNode = (data, id, value, isFolder) => {
    if (data.id === id && data.isFolder) {
      data.items.push({
        isFolder,
        parentId: id,
        id: uuidv4(),
        items: [],
        name: value
      });
      return data;
    }
    let newItems = [];
    newItems = data.items.map((d) => insertNode(d, id, value, isFolder));
    return { ...data, items: newItems };
  }

  const deleteNode = (data, id) => {
    let { items } = data;
    if (data.id === id) {
      return {};
    } else if (data.items) {
      items = items.filter((item) => item.id !== id);
    }

    let newItems = [];
    newItems = items.map((d) => deleteNode(d, id));
    return { ...data, items: newItems };
  };

  const updateNode = (data, id, value) => {
    if (data.id === id) {
      data.name = value;
    }

    let newItems = [];
    newItems = data.items.map((d) => updateNode(d, id, value));
    return { ...data, items: newItems };
  };

  return { insertNode, deleteNode, updateNode }
}

export default useTreeTraversal