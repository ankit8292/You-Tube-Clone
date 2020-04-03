import React, {useState} from 'react';
import {Grid} from '@material-ui/core'
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';
import youtube from './api/youtube'

export default () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);



  // componentDidMount()
  // {
  //   this.handleSubmit('');
  // }

  // onVideoSelect = (video) =>
  // {
  //   this.setState({selectedVideo: video});
  // }

  // handleSubmit = async (searchTerm) =>
  // {
  //   const response = await youtube.get('search',
  //   {
  //     params:{
  //       part: 'snippet',
  //       maxResults: 5,
  //       key: 'AIzaSyBgwaFC5DiWrNs8ptHNscTIUDYVpPYY938',
  //       q: searchTerm
  //     }
  //   }
  //   );
  //   this.setState({videos: response.data.items, selectedVideo: response.data.items[0] });
  //  // console.log(response);
  //   console.log(response.data.items)
  //   console.log(response.data.items[0]);

  // } 
  async function handleSubmit(searchTerm) {
    const { data: { items: videos } } = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: 'AIzaSyBgwaFC5DiWrNs8ptHNscTIUDYVpPYY938',
        q: searchTerm,
      }
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
  }
 
    
    return (
    <Grid style={{justifyContent: "center"}}  container spacing={10} >
      <Grid item xs={12}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </Grid>
        </Grid>
     </Grid>
    </Grid>
    
  );
  
}

