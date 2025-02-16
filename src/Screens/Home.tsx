import { useState } from 'react';
import MapGl from '../components/MapGL';
// import { FlyToInterpolator } from 'react-map-gl';
import useMediaQuery from '../components/useMediaQuery';


function Home() {

  const isMobile = useMediaQuery('(max-width: 768px)');

  interface Location {
    id: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  }

  const locations: Location[] = [
    { id: '1', name: 'Main Library', description: 'On Campus', latitude: 6.675033566213408, longitude: -1.5723546778455368 },
    { id: '2', name: 'Gaza', description: 'Off Campus', latitude: 6.687618867462474, longitude: -1.5570359730017378 },
    { id: '3', name: 'Medical Village', description: 'Hub for student activities', latitude: 6.6800787890749245, longitude: -1.549747261104641 },
    { id: '4', name: 'Pharmacy Busstop', description: 'On Campus', latitude: 6.67480379472123, longitude: -1.5663873751176354 },
    { id: '5', name: 'Pentecost Busstop', description: 'On Campus', latitude: 6.674545299373284, longitude: -1.5675650457295751 },
    { id: '6', name: 'SRC Busstop', description: 'On Campus', latitude: 6.675223889340042, longitude: -1.5678831412482812 },
    { id: '7', name: 'KSB', description: 'Hub for student activities', latitude: 6.669314250173885, longitude: -1.567181795001016 },
    { id: '8', name: 'Brunei', description: 'Hub for student activities', latitude: 6.670465091472612, longitude: -1.5741574445526254 },
    { id: '9', name: 'Hall 7', description: 'Hub for student activities', latitude: 6.679295619563862, longitude: -1.572807677030472 },
    { id: '10', name: 'Conti Busstop', description: 'Hub for student activities', latitude: 6.679644223364716, longitude: -1.572967657880401 },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === '') {
      setFilteredLocations(locations);
    } else {
      const filterData = locations.filter((location) =>
        location.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filterData);
    }
  };

  const LocationList: React.FC<{ searchQuery: string; selectedLocation: Location | null }> = ({ searchQuery, selectedLocation }) => {
    return (
      <div style={{
        borderRadius: 8,
        display: 'flex',
        padding: 12,
        alignItems: 'flex-start',
        gap: 12,
        borderWidth: 1,
        flexDirection : 'column',
        overflowY : 'auto',
        maxHeight : isMobile ? 300 : 'calc(100vh - 220px)',
        width : '330',
        justifyContent : 'flex-start' ,
        
      }}>
        {filteredLocations.length === 0 ? (
          <p>No Bus stop found</p>
        ) : (
          filteredLocations.map((location) => (
            <div
            key={location.id}
            style={{
              borderRadius: 16,
              border: selectedLocation?.id === location.id ? '1px solid rgba(0,0,0,0.5)' : '1px solid rgba(0,0,0,0.1)', // Highlight selected location
              display: 'flex',
              padding: 12,
              alignItems: 'center',
              gap: 16,
              width: '90%',
              justifyContent: 'flex-start',
              cursor: 'pointer',
              backgroundColor: selectedLocation?.id === location.id ? '#F0F8FF' : '#f4f4f4f', // Optional: Add background color
            }}
            onClick={() => handleLocationClick(location)} // Pass the location to the handler
          >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 36 36" fill="none">
                <g clipPath="url(#clip0_629_5804)">
                  <path d="M31 8H23V10H31V31H23V33H33V10C33 9.46957 32.7893 8.96086 32.4142 8.58579C32.0391 8.21071 31.5304 8 31 8Z" fill="black" fillOpacity="0.6" />
                  <path d="M19.88 3H6.12C5.55774 3 5.01851 3.22336 4.62093 3.62093C4.22336 4.01851 4 4.55774 4 5.12V33H22V5.12C22 4.55774 21.7766 4.01851 21.3791 3.62093C20.9815 3.22336 20.4423 3 19.88 3ZM20 31H17V28H9V31H6V5.12C6 5.10424 6.0031 5.08864 6.00913 5.07408C6.01516 5.05952 6.024 5.04629 6.03515 5.03515C6.04629 5.024 6.05952 5.01516 6.07408 5.00913C6.08864 5.0031 6.10424 5 6.12 5H19.88C19.8958 5 19.9114 5.0031 19.9259 5.00913C19.9405 5.01516 19.9537 5.024 19.9649 5.03515C19.976 5.04629 19.9848 5.05952 19.9909 5.07408C19.9969 5.08864 20 5.10424 20 5.12V31Z" fill="black" fillOpacity="0.6" />
                  <path d="M8 8H10V10H8V8Z" fill="black" fillOpacity="0.6" />
                  <path d="M12 8H14V10H12V8Z" fill="black" fillOpacity="0.6" />
                  <path d="M16 8H18V10H16V8Z" fill="black" fillOpacity="0.6" />
                  <path d="M8 13H10V15H8V13Z" fill="black" fillOpacity="0.6" />
                  <path d="M12 13H14V15H12V13Z" fill="black" fillOpacity="0.6" />
                  <path d="M16 13H18V15H16V13Z" fill="black" fillOpacity="0.6" />
                  <path d="M8 18H10V20H8V18Z" fill="black" fillOpacity="0.6" />
                  <path d="M12 18H14V20H12V18Z" fill="black" fillOpacity="0.6" />
                  <path d="M16 18H18V20H16V18Z" fill="black" fillOpacity="0.6" />
                  <path d="M8 23H10V25H8V23Z" fill="black" fillOpacity="0.6" />
                  <path d="M12 23H14V25H12V23Z" fill="black" fillOpacity="0.6" />
                  <path d="M16 23H18V25H16V23Z" fill="black" fillOpacity="0.6" />
                  <path d="M23 13H25V15H23V13Z" fill="black" fillOpacity="0.6" />
                  <path d="M27 13H29V15H27V13Z" fill="black" fillOpacity="0.6" />
                  <path d="M23 18H25V20H23V18Z" fill="black" fillOpacity="0.6" />
                  <path d="M27 18H29V20H27V18Z" fill="black" fillOpacity="0.6" />
                  <path d="M23 23H25V25H23V23Z" fill="black" fillOpacity="0.6" />
                  <path d="M27 23H29V25H27V23Z" fill="black" fillOpacity="0.6" />
                </g>
                <defs>
                  <clipPath id="clip0_629_5804">
                    <rect width="36" height="36" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <p style={{ fontSize: 14, margin: 0 }}>{location.name}</p>
                <p style={{ fontSize: 12, margin: 0, color : 'rgba(0,0,0,0.6)' }}>{location.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div style={{
      flexDirection: "column",
      // backgroundColor: 'red',
      margin: 0,
      top: 0
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        borderRadius: 24,
        height: 'auto',
        overflow: 'hidden',
        flexDirection: isMobile ? 'column' : 'row',

      }}>
        {/* <div style={{
          display: 'flex',
          paddingInline: 16,
          paddingBlock: 16,
          backgroundColor: 'white',
          // marginLeft: 16,
          borderRadius: 24,
          gap: 16,
          flexDirection: 'column',
          width: isMobile ? '90%' : 340,
          minHeight: isMobile ? 300 : 'auto',
          height: isMobile ? 300 : 'auto',
          zIndex: 11111,
          marginTop: 12,
          border: '1px solid rgba(0,0,0,0.1)',
          margin: isMobile ? '16px auto' : '16px 16px 16px 0',
          position : 'fixed',
          bottom : isMobile ? 10 : ''

        }}>
          <p style={{ fontSize: 20, fontWeight: '700', margin: 0 }}>
            Welcome to KNUST <br />
            <span style={{ fontSize: 20, color: '#34A853', fontWeight: '400' }}>Shuttle<span style={{ fontWeight: '400', color: '#FFCE31' }}>App</span></span>
          </p>

          <div style={{
            display: 'flex',
            paddingInline: 16,
            paddingBlock: 12,
            gap: 8,
            backgroundColor: '#F6F6F6',
            borderRadius: 24,
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.1)',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20.031 20.79C20.491 21.25 21.201 20.54 20.741 20.09L16.991 16.33C18.3064 14.8745 19.0336 12.9818 19.031 11.02C19.031 6.63 15.461 3.06 11.071 3.06C6.681 3.06 3.111 6.63 3.111 11.02C3.111 15.41 6.681 18.98 11.071 18.98C13.051 18.98 14.881 18.25 16.281 17.04L20.031 20.79ZM4.11 11.02C4.11 7.18 7.24 4.06 11.07 4.06C14.91 4.06 18.03 7.18 18.03 11.02C18.03 14.86 14.91 17.98 11.07 17.98C7.24 17.98 4.11 14.86 4.11 11.02Z" fill="black" fillOpacity="0.6" />
            </svg>
            <input
              type="text"
              placeholder="Where is your next lecture?"
              value={searchQuery}
              onChange={handleSearch}
              style={{
                flex: 1,
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: 14,
                color: 'rgba(0,0,0,0.6)',
                outline: 'none',
                padding: 0
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
            <LocationList searchQuery={searchQuery}  selectedLocation={selectedLocation}  />
          </div>
        </div> */}

        <div style={{
          display: 'flex',
          paddingInline: 16,
          paddingBlock: 16,
          backgroundColor: 'white',
          // marginLeft: 16,
          borderRadius: 24,
          gap: 16,
          flexDirection: 'column',
          width: isMobile ? '90%' : 340,
          minHeight: isMobile ? 300 : 'auto',
          height: isMobile ? 300 : 'auto',
          zIndex: 11111,
          marginTop: 12,
          border: '1px solid rgba(0,0,0,0.1)',
          margin: isMobile ? '16px auto' : '16px 16px 16px 0',
          position : 'fixed',
          bottom : isMobile ? 10 : ''

        }}>
         
            <div style={{
              display : 'flex',
              alignItems : 'center',
              justifyContent : 'space-between'
            }}>

              <div style={{
                display : 'flex',
                backgroundColor : '#F6F6F6',
                borderRadius : 36,
                padding : 8,
                alignItems : 'center'
              }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 13L5 8L10 3" stroke="black" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </div>

              <p style={{
                    fontSize : '16',
                    fontWeight : '700'
                  }}>KSB</p>

                  <div></div>

            </div>
      
            <div style={{
              display : 'flex',
              borderRadius : 16,
              border: '1px solid rgba(0,0,0,0.1)',
              paddingInline : 16,
              paddingBlock : 12,
              flexDirection : 'column',
              gap : 16
            }}>

                <div style={{
                  display : 'flex',
                  gap : 8,
                  alignItems : 'center'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 5.33333V7.99999L9.66667 9.66666" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.892 4.58067L2.392 4.58267C2.39253 4.71447 2.44507 4.84073 2.53821 4.93399C2.63134 5.02725 2.75753 5.07997 2.88933 5.08067L2.892 4.58067ZM4.58667 5.08867C4.65233 5.08897 4.71741 5.07634 4.77819 5.0515C4.83897 5.02666 4.89426 4.99008 4.9409 4.94387C4.98755 4.89766 5.02464 4.84271 5.05005 4.78216C5.07546 4.72162 5.08869 4.65666 5.089 4.591C5.08931 4.52534 5.07668 4.46026 5.05183 4.39948C5.02699 4.3387 4.99042 4.28341 4.9442 4.23676C4.89799 4.19012 4.84304 4.15303 4.7825 4.12762C4.72195 4.10221 4.65699 4.08897 4.59133 4.08867L4.58667 5.08867ZM3.38333 2.88067C3.38263 2.74806 3.32927 2.62116 3.235 2.52789C3.14073 2.43463 3.01328 2.38263 2.88067 2.38333C2.74806 2.38404 2.62116 2.4374 2.52789 2.53167C2.43463 2.62593 2.38263 2.75339 2.38333 2.886L3.38333 2.88067ZM2.5 8C2.5 7.86739 2.44732 7.74022 2.35355 7.64645C2.25979 7.55268 2.13261 7.5 2 7.5C1.86739 7.5 1.74021 7.55268 1.64645 7.64645C1.55268 7.74022 1.5 7.86739 1.5 8H2.5ZM11.25 13.63C11.3092 13.5985 11.3615 13.5553 11.4037 13.5031C11.4459 13.4509 11.4772 13.3908 11.4957 13.3263C11.5142 13.2617 11.5194 13.1941 11.5112 13.1275C11.503 13.0609 11.4815 12.9966 11.4479 12.9385C11.4143 12.8804 11.3694 12.8297 11.3158 12.7893C11.2622 12.7489 11.201 12.7197 11.1358 12.7035C11.0707 12.6873 11.003 12.6843 10.9367 12.6948C10.8704 12.7053 10.8069 12.7291 10.75 12.7647L11.25 13.63ZM12.7647 10.75C12.7291 10.8069 12.7053 10.8704 12.6948 10.9367C12.6843 11.003 12.6873 11.0707 12.7035 11.1358C12.7197 11.201 12.7489 11.2622 12.7893 11.3158C12.8297 11.3694 12.8804 11.4143 12.9385 11.4479C12.9966 11.4815 13.0609 11.503 13.1275 11.5112C13.1941 11.5194 13.2617 11.5142 13.3263 11.4957C13.3908 11.4772 13.4509 11.4459 13.5031 11.4037C13.5553 11.3615 13.5985 11.3092 13.63 11.25L12.7647 10.75ZM3.42667 3.38C3.33243 3.47336 3.27913 3.60033 3.27851 3.73298C3.27788 3.86563 3.32998 3.99309 3.42333 4.08733C3.51669 4.18157 3.64366 4.23487 3.77631 4.23549C3.90896 4.23612 4.03643 4.18402 4.13067 4.09067L3.42667 3.38ZM12.5747 3.42467C10.028 0.878 5.91267 0.852667 3.38267 3.38267L4.08933 4.08867C6.22267 1.956 9.70467 1.96867 11.868 4.132L12.5747 3.42467ZM3.38267 3.38267L2.53867 4.22667L3.24533 4.93333L4.09 4.09L3.38267 3.38267ZM2.88933 5.08067L4.58667 5.08867L4.59133 4.08867L2.89467 4.08067L2.88933 5.08067ZM3.392 4.578L3.38333 2.88067L2.38333 2.886L2.392 4.58267L3.392 4.578ZM8 2.5C9.45869 2.5 10.8576 3.07946 11.8891 4.11091C12.9205 5.14236 13.5 6.54131 13.5 8H14.5C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5V2.5ZM8 13.5C6.54131 13.5 5.14236 12.9205 4.11091 11.8891C3.07946 10.8576 2.5 9.45869 2.5 8H1.5C1.5 9.72391 2.18482 11.3772 3.40381 12.5962C4.62279 13.8152 6.27609 14.5 8 14.5V13.5ZM10.75 12.7647C9.91425 13.2481 8.96548 13.5018 8 13.5V14.5C9.18333 14.5 10.2933 14.1833 11.25 13.63L10.75 12.7647ZM13.5 8C13.5018 8.96548 13.2481 9.91425 12.7647 10.75L13.63 11.25C14.2014 10.2623 14.5016 9.14109 14.5 8H13.5ZM4.13067 4.09067C5.15927 3.06943 6.55054 2.49792 8 2.5V1.5C6.28691 1.49779 4.64263 2.1733 3.42667 3.38L4.13067 4.09067Z" fill="black" fill-opacity="0.6"/>
                  </svg>

                  <p style={{
                    margin : 0,
                    fontSize : 12,
                    color : 'rgba(0,0,0,0.5)'
                  }}>Arriving in 5 mibutes</p>
                </div>

                <div style={{
                  height : 7,
                  width : '100%',
                  backgroundColor : '#D0D3DA',
                  borderRadius : 40,
                }}>
                  <div style={{
                    height : 7,
                    width : "60%",
                    backgroundColor : '#52B922',
                    borderRadius : 40,
                  }}></div>
                </div>

                <div style={{
                  display : 'flex',
                  alignItems : 'center',
                  justifyContent : 'space-between'
                }}>
                  <p style={{
                    margin : 0,
                    fontSize : 12,
                    color : 'rgba(0,0,0,0.5)'
                  }}>60 meters away</p>
                  <p style={{
                    margin : 0,
                    fontSize : 12,
                    color : 'rgba(0,0,0,0.5)'
                  }}>Total Distance Covered: 180M</p>
                </div>

            </div>

            <div style={{
              display : 'flex',
              borderRadius : 16,
              border: '1px solid rgba(0,0,0,0.1)',
              paddingInline : 16,
              paddingBlock : 12,
              flexDirection : 'column',
              gap : 16
            }}>

                  <p style={{
                    margin : 0,
                    fontSize : 14,
                    fontWeight : '700'
                  }}>Bus Stops</p>

                  <div style={{
                    display : 'flex',
                    flexDirection : 'column',
                    gap : 8
                  }}>

                    
                  <div style={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'space-between'
                  }}>
                    <div style={{
                       display : 'flex',
                       alignItems : 'center',
                       gap : 12
                    }}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#4285F4CC"/>
                </svg>

                    <p style={{
                      margin : 0,
                      fontSize : 12,
                      color : 'rgba(0,0,0,0.6)'
                    }}>Central Bus stop</p>
    
                    </div>

                    <p style={{
                      margin : 0,
                      fontSize : 12,
                      color : 'rgba(0,0,0,0.6)'
                    }}>7:32</p>

                  </div>

                  <div style={{
                    height : 16 ,
                    width : 2,
                    backgroundColor : '#689DF6',
                    marginLeft : '2%'
                  }}></div>


<div style={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'space-between'
                  }}>
                    <div style={{
                       display : 'flex',
                       alignItems : 'center',
                       gap : 12
                    }}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#4285F4CC"/>
                </svg>

                    <p style={{
                      margin : 0,
                      fontSize : 12,
                      color : 'rgba(0,0,0,0.6)'
                    }}>Hall 7 Bus stop</p>
    
                    </div>

                    <p style={{
                      margin : 0,
                      fontSize : 12,
                      color : 'rgba(0,0,0,0.6)'
                    }}>7:32</p>

                  </div>

                  <div style={{
                    height : 16 ,
                    width : 2,
                    backgroundColor : '#689DF6',
                    marginLeft : '2%'
                  }}></div>


<div style={{
                    display : 'flex',
                    alignItems : 'center',
                    justifyContent : 'space-between'
                  }}>
                    <div style={{
                       display : 'flex',
                       alignItems : 'center',
                       gap : 12
                    }}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#4285F4CC"/>
                </svg>

                    <p style={{
                      margin : 0,
                      fontSize : 12,
                      color : 'rgba(0,0,0,0.6)'
                    }}>Casley Hayford Bus stop</p>
    
                    </div>

                    <p style={{
                      margin : 0,
                      fontSize : 12,
                      color : 'rgba(0,0,0,0.6)'
                    }}>7:32</p>

                  </div>

                  <div style={{
                    height : 16 ,
                    width : 2,
                    backgroundColor : '#689DF6',
                    marginLeft : '2%'
                  }}></div>

                  <div style={{
                       display : 'flex',
                       alignItems : 'center',
                       gap : 12
                    }}>

                    <div style={{
                      width : 12,
                      height : 12,
                      border :'1px solid rgba(0,0,0,0.2)',
                      borderRadius : 50
                    }}></div>

                    <p style={{
                      margin : 0,
                      fontSize : 12,
                      color : 'rgba(0,0,0,0.6)'
                    }}>KSB</p>
    
                    </div>
                  


                  </div>

             
          
            </div>

        </div>

        <MapGl selectedLocation={selectedLocation}/>
      </div>
    </div>
  );
}

export default Home;