import getEmailCurrentUser from "./getUserCurrentEmail";

const createPost = async (dataTranfer: any): Promise<void> => {
  const email = getEmailCurrentUser();

  if (email !== '') {
    const thumbnail: string = dataTranfer.thumbnail[0].thumbUrl;

    const title: string = dataTranfer.title;
    const description: string = dataTranfer.description;

    // console.log(typeof thumbnail)
    // console.log(thumbnail)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/create-post`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title,
        thumbnail,
        description,
        email
      })
    });

    const result = await response.json();

    console.log('check result:', result);
    return result;
  }
}

export default createPost;