# BCP-Analytics

## Installation

Install with yarn

```
yarn add bcp-analytics
```

Install with npm

```
npm install bcp-analytics
```

## Usage

Start collecting page and copy events with Segment:

```
const BcpAnalytics = require('bcp-analytics')

new BcpAnalytics()
  .registerSegment({ url: $SEGMENT_URL })
  .start()
```

## Define a custom user ID

Since the user ID can be anything you can define your own method of retrieving it. Simply set
the get user id method so it can be used by this tool. Example:

```
const BcpAnalytics = require('bcp-analytics')

new BcpAnalytics()
  .registerSegment({ url: $SEGMENT_URL })
  .setGetUserId(async () => "my custom user id")
  .start()
```

## Configuration

Manage the tracking of page and copy events by overwriting the default config. Example:

```
const BcpAnalytics = require('bcp-analytics')

new BcpAnalytics({
  trackPages: true,
  trackCopies: false,
  debug: true
})
  .registerSegment({ url: $SEGMENT_URL })
  .start()
```

## OptIn & OptOut

By default opt in is enabled. To opt out simply add it in the constructor:

```
const BcpAnalytics = require('bcp-analytics')

new BcpAnalytics({
  optOut: true
})
  .registerSegment({ url: $SEGMENT_URL })
  .start()
```

or opt out anytime with

```
const BcpAnalytics = require('bcp-analytics')

const analytics = new BcpAnalytics()
  .registerSegment({ url: $SEGMENT_URL })
  .start()

// opt out
analytics.optOut()

// opt in again
analytics.optIn()
```
