# flickr-background

Change your Atom background by awesome photos comes from Flickr

## Screenshots

![flickr-background](https://raw.githubusercontent.com/thenewvu/atom-flickr-background/master/screenshots/Screenshot-2016-05-28-21-46-11.png "flickr-background")

## Commands

```json
{
  "atom-workspace": {
    "ctrl-alt-o": "flickr-background:toggle",
    "ctrl-alt-i": "flickr-background:show-photo-info",
    "ctrl-alt-n": "flickr-background:next-photo",
    "ctrl-alt-+": "flickr-background:increse-opacity",
    "ctrl-alt--": "flickr-background:decrese-opacity"
  }
}
```

### Options

```javascript
{
  tags: {
    type: 'string',
    title: 'Tags',
    description: 'Find any photo has these tags. Tags are delimited by commas.',
    default: ''
  },
  text: {
    type: 'string',
    title: 'Keyword',
    description: 'Find any photo that has the text in its description or title',
    default: ''
  },
  interval: {
    type: 'integer',
    title: 'Interval',
    description: 'In seconds. After each this amount of time, the background will change to a new photo',
    default: 60,
    minimum: 30
  }
}
```
