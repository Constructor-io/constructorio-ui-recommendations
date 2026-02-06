### Arguments passed to children via Render Props

> Accessible to children of the CioRecommendations component via render props

| Property            | Type                                  | Description                          |
| ------------------- | ------------------------------------- | ------------------------------------ |
| items               | `Item[]`                              | Array of recommendation items        |
| podId               | `string`                              | The pod ID being displayed           |
| podSubheader        | `string \| undefined`                 | Optional subheader text              |
| cioClient           | `ConstructorIOClient \| null`         | Constructor.io client instance       |
| cioClientOptions    | `CioClientOptions`                    | Configuration options for the client |
| setCioClientOptions | `(options: CioClientOptions) => void` | Function to update client options    |
| parameters          | `RecommendationsParameters`           | API request parameters               |
| itemFieldGetters    | `ItemFieldGetters`                    | Functions to extract item data       |
