import React from 'react';
import { useQuery, gql } from '@apollo/client';

const LANG_DATA = gql`
  query languageQuery {
    langs {
      id
      lang
      liked
    }
  }
`;

export const Lang = () => {
  const { data, loading, error} = useQuery(LANG_DATA);
  if( loading ) return <p> 🗺 Loading..</p>;
  if( error ) return <p> 🗺 Error. {error}</p>;
  return (
    <div><h2> 🗺 </h2>
     {data.langs.length > 0 && data.langs.map( ( {id, lang, liked} ) => {
       return(<div key={id}>{lang}, {liked}</div>);
     }
     )}
    </div>
    );
}