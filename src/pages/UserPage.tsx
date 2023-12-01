import React, { useContext, useEffect, useRef, useState } from 'react';
import { firstLetterUpperCase } from '../utility/pickIcon';
import { PetsContext } from '../store/PetsContext';
import addPhoto from '../assets/add-new-photo.svg';
import { BASE_URL } from '../api/fetch';
import { Loader } from '../components/LoaderTypeScript';

export const UserPage: React.FC = () => {
  const { user } = useContext(PetsContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined | string>();
  const [preview, setPreview] = useState<string | ArrayBuffer | undefined>()
  const token = window.localStorage.getItem('token');
  const [submitting, setSubmitting] = useState(false);
  const [userImage, setUserImage] = useState<undefined | string>();

  useEffect(() => {
    setUserImage(user?.profile_picture);
  }, [user])

  const handlerClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const cancelHandler = () => {
    setFile('');
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement> ) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    setFile(target.files[0]);

    const fileReader = new FileReader;


    fileReader.onload = function ()  {
      if (!fileReader.result) return
      setPreview(fileReader.result)
    }

    fileReader.readAsDataURL(target.files[0])

  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);

    if (typeof file === 'undefined') return;

    const formData = new FormData();

    formData.append('profile_picture', file);

    await fetch( BASE_URL + '/api/users/me/upload-image/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ token }`,
      },
      body: formData,
    })
      .then((res) => {
        return res.json()
      }).
      then(data => {
        setUserImage(data.profile_picture)
        setSubmitting(false);
        setFile('');
      })
  }

  return (
    <>
      {!user && <Loader size={2} />}
      {user && (
        <section className="user-page">
          <article className="user-page__information">
            <div className="user-page__image__wrapper">
              <form
                className="user-page__wrapper"
                onClick={handlerClick}>

                {user.profile_picture && (
                  <>
                    <div className="image__wrapper">
                      <img className="image__profile"  src={userImage} />
                    </div>
                  </>
                )}
                {!user.profile_picture && (
                  <>
                    <img className="user-page__photo" src={addPhoto} alt="user photo" />
                    <p>Add new photo</p>
                  </>
                )}
                <input
                  type="file"
                  accept='image/*'
                  name='image'
                  className='input-field'
                  ref={inputRef}
                  onChange={handleChange}
                  hidden
                />
              </form>

              {file && (
                <div className="buttons">
                  {!submitting && (
                    <button className="button button__signIn" onClick={cancelHandler}>Cancel</button>
                  )}

                  <button className="button button__signIn" onClick={submitHandler}>
                    {submitting && <Loader size={1} />}
                    {!submitting && 'Submit'}
                  </button>
                </div>
              )}

            </div>


            <div className="user-page__description">
              <h2>{firstLetterUpperCase(user.first_name)} {firstLetterUpperCase(user.last_name)}</h2>
              <p>{user.email}</p>
              <p>{user.phone_number}</p>
            </div>
          </article>
        </section>
      )}

    </>

  );
};
