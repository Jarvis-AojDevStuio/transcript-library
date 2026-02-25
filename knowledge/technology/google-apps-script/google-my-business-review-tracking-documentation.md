---
title: "Google My Business Review Tracking with Apps Script and Database Integration"
description: "Comprehensive guide for building Google Apps Script solutions to track GMB reviews and store them in databases like Google Sheets or Supabase."
category: "Technical Documentation"
subcategory: "API Integration"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - google-my-business
  - apps-script
  - review-tracking
  - database-integration
  - automation
---

# Google My Business Review Tracking with Apps Script and Database Integration

This documentation provides comprehensive guidance for building Google Apps Script solutions that connect to Google My Business (GMB) to track reviews and store them in databases like Google Sheets or Supabase.

## Table of Contents

1. [Overview](#overview)
2. [Google My Business API Setup](#google-my-business-api-setup)
3. [Available GMB APIs](#available-gmb-apis)
4. [Apps Script Integration](#apps-script-integration)
5. [Database Integration Options](#database-integration-options)
6. [Supabase Integration](#supabase-integration)
7. [Implementation Examples](#implementation-examples)
8. [Best Practices](#best-practices)

## Overview

Based on Context7 research, there are several approaches to track Google My Business reviews:

1. **Google My Business API** - Official APIs for accessing business information and performance data
2. **Google Apps Script** - For automation and Google Workspace integration
3. **Database Storage** - Google Sheets, Supabase, or other databases for persistent storage
4. **Node.js Libraries** - For server-side implementation

## Google My Business API Setup

### Required Dependencies

The Google My Business ecosystem has been split into multiple specialized APIs:

#### .NET Setup

```csharp
// Required NuGet packages
Google.Apis.MyBusinessAccountManagement
Google.Apis.Auth
```

#### Java Setup

```gradle
dependencies {
    compile 'com.google.apis:google-api-services-mybusinessaccountmanagement:v1-rev20210217-1.31.0'
    compile 'com.google.oauth-client:google-oauth-client-jetty:1.31.0'
    implementation 'com.google.code.gson:gson:2.8.6'
}
```

#### PHP Setup

```bash
wget -O composer-setup.php https://getcomposer.org/installer
mkdir bin
php composer-setup.php --install-dir=bin --filename=composer
php bin/composer require google/apiclient:"^2.9.1"

# Run PHP script
php -S localhost:8000 accounts-list.php
```

#### Python Setup

```bash
pip install virtualenv
virtualenv myenv
source myenv/bin/activate
myenv/bin/pip install google-api-python-client oauth2client

# Execute sample
python accounts_list.py
```

## Available GMB APIs

### Core Business APIs

#### 1. My Business Account Management

```bash
npm install @googleapis/mybusinessaccountmanagement
```

- Manage business accounts
- Handle account permissions
- Account hierarchy management

#### 2. My Business Business Information

```bash
npm install @googleapis/mybusinessbusinessinformation
```

- Business profile data
- Location information
- Business details and attributes

#### 3. My Business Business Calls

```bash
npm install @googleapis/mybusinessbusinesscalls
```

- Call tracking and analytics
- Call performance metrics

#### 4. My Business Verifications

```bash
npm install @googleapis/mybusinessverifications
```

- Business verification status
- Verification process management

#### 5. My Business Q&A

```bash
npm install @googleapis/mybusinessqanda
```

- Customer questions and answers
- Q&A management

#### 6. My Business Notifications

```bash
npm install @googleapis/mybusinessnotifications
```

- Notification settings
- Alert configurations

#### 7. My Business Place Actions

```bash
npm install @googleapis/mybusinessplaceactions
```

- Action buttons on business listings
- Call-to-action management

#### 8. My Business Lodging

```bash
npm install @googleapis/mybusinesslodging
```

- Hotel and lodging specific features
- Room and amenity information

### Performance and Analytics APIs

#### Business Profile Performance API

```bash
npm install @googleapis/businessprofileperformance
```

- **This is likely the most relevant for review tracking**
- Performance metrics and analytics
- Customer interaction data
- Review-related performance metrics

## Apps Script Integration

### Basic Setup

#### 1. Google Apps Script Project Configuration

```bash
clasp create <script name>
clasp push
clasp open
```

#### 2. Required OAuth Scopes

```text
https://www.googleapis.com/auth/documents
https://www.googleapis.com/auth/presentations.currentonly
```

#### 3. Service Account Configuration

```javascript
const SERVICE_ACCOUNT = '{"type": "service_account", ...}';
```

### Advanced Setup for AI Integration

#### Google Cloud Project Setup

```markdown
1. Create a Cloud Project
   1. Enable the Vertex AI API
   1. Enable Google Drive API
   1. Configure OAuth consent screen
   1. Create a Service Account and grant the role Service `Vertex AI User` role
   1. Create a private key with type JSON. This will download the JSON file for use in the next section.
```

#### Apps Script Project Configuration

```markdown
1. Open a standalone Apps Script project.
   1. From Project Settings, change project to GCP project number of Cloud Project from step 1
   1. Add a Script Property. Enter `model_id` as the property name and `gemini-pro` as the value.
   1. Add a Script Property. Enter `project_location` as the property name and `us-central1` as the value.
   1. Add a Script Property. Enter `service_account_key` as the property name and paste the JSON key from the service account as the value.
1. Add `Google Drive API v3` advanced service.
1. Add OAuth2 v43 Apps Script Library using the ID `1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF`.
1. Add the project code to Apps Script
```

## Database Integration Options

### 1. Google Sheets Integration

#### Basic Sheets Update

```javascript
function updateReviewsInSheets(reviews) {
  const sheet = SpreadsheetApp.getActiveSheet();

  reviews.forEach((review, index) => {
    const row = index + 2; // Start from row 2 (assuming headers in row 1)
    sheet.getRange(row, 1).setValue(review.reviewId);
    sheet.getRange(row, 2).setValue(review.customerName);
    sheet.getRange(row, 3).setValue(review.rating);
    sheet.getRange(row, 4).setValue(review.comment);
    sheet.getRange(row, 5).setValue(review.date);
  });
}
```

### 2. External Database Integration

#### HTTP Requests from Apps Script

```javascript
function sendToDatabase(reviewData) {
  const url = 'YOUR_DATABASE_ENDPOINT';
  const payload = JSON.stringify(reviewData);

  const options = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    'payload': payload
  };

  const response = UrlFetchApp.fetch(url, options);
  return JSON.parse(response.getContentText());
}
```

## Supabase Integration

### Supabase Client Setup

#### JavaScript Client Initialization

```javascript
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://<project>.supabase.co'
const SUPABASE_KEY = '<your-anon-key>'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
```

#### Environment Configuration

```javascript
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Database Operations

#### Inserting Review Data

```javascript
const { data, error } = await supabase
  .from('reviews')
  .insert([
    {
      business_id: 'your-business-id',
      review_id: review.id,
      customer_name: review.customerName,
      rating: review.rating,
      comment: review.comment,
      review_date: review.date,
      created_at: new Date().toISOString()
    }
  ])
```

#### Querying Review Data

```javascript
const { data, error } = await supabase
  .from('reviews')
  .select('*')
  .eq('business_id', 'your-business-id')
  .order('review_date', { ascending: false })
```

#### Complex Queries with Filtering

```javascript
const { data, error } = await supabase
  .from('reviews')
  .select('customer_name, rating, comment, review_date')
  .gte('rating', 4)
  .lte('review_date', '2024-12-31')
  .order('review_date', { ascending: false })
  .limit(20)
```

#### Real-time Updates

```javascript
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  realtime: {
    params: {
      log_level: 'info',
    },
  },
})

// Subscribe to review changes
const subscription = supabase
  .channel('reviews-channel')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'reviews' },
    (payload) => {
      console.log('New review:', payload.new)
    }
  )
  .subscribe()
```

## Implementation Examples

### Example 1: Basic Review Tracker with Google Sheets

```javascript
/**
 * Main function to fetch and store GMB reviews
 */
function trackGMBReviews() {
  try {
    // Initialize GMB API client
    const gmbService = getGMBService();

    // Fetch business accounts
    const accounts = gmbService.accounts.list().accounts;

    if (!accounts || accounts.length === 0) {
      console.log('No business accounts found');
      return;
    }

    // Process each account
    accounts.forEach(account => {
      processAccountReviews(account);
    });

  } catch (error) {
    console.error('Error tracking GMB reviews:', error);
  }
}

/**
 * Process reviews for a specific account
 */
function processAccountReviews(account) {
  try {
    // Get locations for the account
    const locations = getBusinessLocations(account.name);

    locations.forEach(location => {
      // Fetch reviews for each location
      const reviews = getLocationReviews(location.name);

      if (reviews && reviews.length > 0) {
        // Store in Google Sheets
        storeReviewsInSheets(location, reviews);
      }
    });

  } catch (error) {
    console.error(`Error processing account ${account.name}:`, error);
  }
}

/**
 * Store reviews in Google Sheets
 */
function storeReviewsInSheets(location, reviews) {
  const sheet = getOrCreateSheet(location.displayName || 'Reviews');

  // Add headers if not present
  if (sheet.getLastRow() === 0) {
    const headers = ['Review ID', 'Customer Name', 'Rating', 'Comment', 'Date', 'Location'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  // Add review data
  const lastRow = sheet.getLastRow();
  reviews.forEach((review, index) => {
    const row = lastRow + index + 1;
    const values = [
      review.reviewId || '',
      review.reviewer?.displayName || 'Anonymous',
      review.starRating || 0,
      review.comment || '',
      review.createTime || '',
      location.displayName || ''
    ];

    sheet.getRange(row, 1, 1, values.length).setValues([values]);
  });
}
```

### Example 2: Advanced Integration with Supabase

```javascript
/**
 * Apps Script function to sync GMB reviews with Supabase
 */
function syncReviewsWithSupabase() {
  try {
    // Fetch reviews from GMB API
    const reviews = fetchGMBReviews();

    // Send to Supabase via webhook/API
    const supabaseEndpoint = 'YOUR_SUPABASE_EDGE_FUNCTION_URL';

    const payload = {
      reviews: reviews,
      business_id: 'YOUR_BUSINESS_ID',
      sync_timestamp: new Date().toISOString()
    };

    const options = {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_SUPABASE_ANON_KEY'
      },
      'payload': JSON.stringify(payload)
    };

    const response = UrlFetchApp.fetch(supabaseEndpoint, options);
    const result = JSON.parse(response.getContentText());

    console.log('Sync result:', result);

  } catch (error) {
    console.error('Error syncing with Supabase:', error);
  }
}

/**
 * Supabase Edge Function to handle review data
 */
// supabase/functions/sync-reviews/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  try {
    const { reviews, business_id, sync_timestamp } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Process each review
    const reviewData = reviews.map(review => ({
      business_id: business_id,
      review_id: review.reviewId,
      customer_name: review.reviewer?.displayName,
      rating: review.starRating,
      comment: review.comment,
      review_date: review.createTime,
      sync_timestamp: sync_timestamp
    }))

    // Upsert reviews (insert or update if exists)
    const { data, error } = await supabase
      .from('gmb_reviews')
      .upsert(reviewData, {
        onConflict: 'review_id',
        ignoreDuplicates: false
      })

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({
        success: true,
        processed: reviewData.length,
        data: data
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
```

### Example 3: Automated Review Monitoring with Triggers

```javascript
/**
 * Set up time-based trigger for automatic review monitoring
 */
function setupReviewMonitoring() {
  // Delete existing triggers
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'monitorReviews') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Create new hourly trigger
  ScriptApp.newTrigger('monitorReviews')
    .timeBased()
    .everyHours(1)
    .create();

  console.log('Review monitoring trigger set up successfully');
}

/**
 * Monitor reviews and send notifications for new ones
 */
function monitorReviews() {
  try {
    const lastCheck = PropertiesService.getScriptProperties().getProperty('LAST_REVIEW_CHECK');
    const currentTime = new Date().toISOString();

    // Fetch reviews since last check
    const newReviews = fetchReviewsSince(lastCheck);

    if (newReviews.length > 0) {
      // Store in database
      storeReviews(newReviews);

      // Send notifications
      sendNotifications(newReviews);

      // Update last check timestamp
      PropertiesService.getScriptProperties().setProperty('LAST_REVIEW_CHECK', currentTime);
    }

  } catch (error) {
    console.error('Error monitoring reviews:', error);

    // Send error notification
    sendErrorNotification(error.message);
  }
}

/**
 * Send notifications for new reviews
 */
function sendNotifications(reviews) {
  const emailTemplate = `
    <h2>New Google My Business Reviews</h2>
    <p>You have received ${reviews.length} new review(s):</p>

    ${reviews.map(review => `
      <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
        <strong>Rating:</strong> ${review.starRating}/5<br>
        <strong>Customer:</strong> ${review.reviewer?.displayName || 'Anonymous'}<br>
        <strong>Comment:</strong> ${review.comment || 'No comment'}<br>
        <strong>Date:</strong> ${new Date(review.createTime).toLocaleString()}
      </div>
    `).join('')}
  `;

  GmailApp.sendEmail(
    'your-email@example.com',
    'New GMB Reviews Received',
    '',
    { htmlBody: emailTemplate }
  );
}
```

## Database Schema Recommendations

### Supabase Table Schema

```sql
-- Create reviews table
CREATE TABLE gmb_reviews (
  id BIGSERIAL PRIMARY KEY,
  business_id TEXT NOT NULL,
  review_id TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  review_date TIMESTAMPTZ,
  sync_timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_gmb_reviews_business_id ON gmb_reviews(business_id);
CREATE INDEX idx_gmb_reviews_review_date ON gmb_reviews(review_date);
CREATE INDEX idx_gmb_reviews_rating ON gmb_reviews(rating);

-- Create RLS policies for security
ALTER TABLE gmb_reviews ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all reviews
CREATE POLICY "Allow authenticated read" ON gmb_reviews
  FOR SELECT TO authenticated
  USING (true);

-- Allow service role to insert/update reviews
CREATE POLICY "Allow service role write" ON gmb_reviews
  FOR ALL TO service_role
  USING (true);

-- Create view for review statistics
CREATE VIEW review_stats AS
SELECT
  business_id,
  COUNT(*) as total_reviews,
  AVG(rating) as average_rating,
  COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star_reviews,
  COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star_reviews,
  MAX(review_date) as latest_review_date
FROM gmb_reviews
GROUP BY business_id;
```

### Google Sheets Schema

| Column A  | Column B      | Column C | Column D | Column E    | Column F | Column G  |
| --------- | ------------- | -------- | -------- | ----------- | -------- | --------- |
| Review ID | Customer Name | Rating   | Comment  | Review Date | Location | Sync Date |

## Best Practices

### 1. API Rate Limiting

- Implement exponential backoff for API calls
- Respect Google API quotas and limits
- Cache frequently accessed data

### 2. Error Handling

```javascript
function robustAPICall(apiFunction, maxRetries = 3) {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      return apiFunction();
    } catch (error) {
      retries++;

      if (retries >= maxRetries) {
        throw error;
      }

      // Exponential backoff
      const delay = Math.pow(2, retries) * 1000;
      Utilities.sleep(delay);
    }
  }
}
```

### 3. Data Validation

```javascript
function validateReviewData(review) {
  const required = ['reviewId', 'starRating'];
  const missing = required.filter(field => !review[field]);

  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }

  if (review.starRating < 1 || review.starRating > 5) {
    throw new Error('Invalid rating: must be between 1 and 5');
  }

  return true;
}
```

### 4. Security Considerations

- Store API keys securely using PropertiesService
- Use service accounts for server-to-server communication
- Implement proper authentication for database access
- Validate and sanitize all input data

### 5. Performance Optimization

- Batch database operations when possible
- Use incremental sync to avoid processing duplicate data
- Implement proper indexing on database tables
- Consider caching strategies for frequently accessed data

## Monitoring and Maintenance

### 1. Logging

```javascript
function logActivity(action, details) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${action}: ${JSON.stringify(details)}`;

  console.log(logEntry);

  // Optional: Store in a dedicated log sheet
  const logSheet = SpreadsheetApp.openById('LOG_SHEET_ID').getActiveSheet();
  logSheet.appendRow([timestamp, action, JSON.stringify(details)]);
}
```

### 2. Health Checks

```javascript
function performHealthCheck() {
  const checks = {
    apiConnection: testGMBConnection(),
    databaseConnection: testDatabaseConnection(),
    lastSyncTime: getLastSyncTime(),
    errorCount: getRecentErrorCount()
  };

  const isHealthy = Object.values(checks).every(check => check.status === 'ok');

  if (!isHealthy) {
    sendAlertNotification(checks);
  }

  return checks;
}
```

## Conclusion

This documentation provides a comprehensive foundation for building Google My Business review tracking systems using Google Apps Script and various database options. The key components include:

1. **Google My Business API integration** for accessing review data
2. **Google Apps Script** for automation and Google Workspace integration
3. **Database storage options** including Google Sheets and Supabase
4. **Real-time monitoring and notifications**
5. **Best practices for security, performance, and maintenance**

The examples provided can be customized based on specific business requirements and technical constraints.
