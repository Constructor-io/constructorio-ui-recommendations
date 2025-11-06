| property | type                            | description                                                                                   |
| -------- | ------------------------------- | --------------------------------------------------------------------------------------------- |
| status   | `RequestStatus`                 | The current status of the recommendation request (eg. `IDLE`, `FETCHING`, `SUCCESS`, `ERROR`) |
| message  | `string` \| `null`              | Any error message encountered during the request                                              |
| data     | `RecommendationsData` \| `null` | The transformed recommendation data                                                           |
| refetch  | () => void                      | A function to manually refetch the recommendation results                                     |
