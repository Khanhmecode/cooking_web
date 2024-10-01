import getEmailCurrentUser from "./getUserCurrentEmail";

const createComment = async (dataTranfer: any): Promise<void> => {
  try {    
    const email = getEmailCurrentUser();
    if (email !== '') {      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/comment`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          content: dataTranfer.content,
          categoryId: dataTranfer.categoryId,
          email: email
        })
      });

      const result = await response.json();

      location.reload();
      return result;
    } else {
      alert('Sign in first!');
    }
  } catch (error) {
    throw error;
  }
}

export default createComment;