import getEmailCurrentUser from "./getUserCurrentEmail";

const handleVote = async (categoryId : Number, type: String) => {
  const email = getEmailCurrentUser();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vote`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      categoryId,
      email,
      type
    })
  });

  const result = await response.json();

  return result;
}

export default handleVote;