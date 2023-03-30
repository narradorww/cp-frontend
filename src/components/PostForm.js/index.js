import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("offer");

    const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      userId: user._id, // adiciona o id do usuário autenticado ao objeto post
      title,
      description,
      type,
    };
  
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.post('http://localhost:3001/posts', post, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      // Exibir uma mensagem de sucesso
      alert('Post criado com sucesso!');
      // Limpar o formulário
      setTitle('');
      setDescription('');
      setType('');
    } catch (error) {
      console.error(error);
      // Exibir uma mensagem de erro
      alert('Houve um erro ao criar o post.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Título</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description">Descrição</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="type">Tipo</label>
      <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="offer">Oferta</option>
        <option value="request">Pedido</option>
      </select>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default PostForm;
