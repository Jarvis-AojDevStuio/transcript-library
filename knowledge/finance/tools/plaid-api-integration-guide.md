# PLAID API Integration Guide for Portfolio Management

## Overview

This guide documents how to integrate PLAID API into your portfolio management toolkit to pull live investment data from Fidelity and other brokerages.

## Prerequisites

### 1. PLAID Account Setup

```bash
# Sign up for PLAID account at https://dashboard.plaid.com/signup
# You'll need:
# - Development environment (free for testing)
# - Production access (requires application review)
```

### 2. Install Required Libraries

```bash
pip install plaid-python
pip install pandas
pip install python-dotenv
pip install openpyxl  # For Excel export
```

### 3. Environment Configuration

Create a `.env` file in your project root:

```env
PLAID_CLIENT_ID=your_client_id_here
PLAID_SECRET=your_secret_key_here
PLAID_ENV=sandbox  # Use 'development' or 'production' for live data
PLAID_PRODUCTS=transactions,investments
PLAID_COUNTRY_CODES=US
```

## Implementation Steps

### Step 1: Initialize PLAID Client

```python
import plaid
from plaid.api import plaid_api
from plaid.model.investments_holdings_get_request import InvestmentsHoldingsGetRequest
from plaid.model.investments_transactions_get_request import InvestmentsTransactionsGetRequest
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure PLAID client
configuration = plaid.Configuration(
    host=getattr(plaid.Environment, os.getenv('PLAID_ENV'), plaid.Environment.sandbox),
    api_key={
        'clientId': os.getenv('PLAID_CLIENT_ID'),
        'secret': os.getenv('PLAID_SECRET'),
    }
)

api_client = plaid.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)
```

### Step 2: Link Your Investment Accounts

```python
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.country_code import CountryCode

def create_link_token():
    """Generate a link token for Plaid Link initialization"""
    request = LinkTokenCreateRequest(
        products=['investments'],
        client_name="Portfolio Tracker",
        country_codes=[CountryCode('US')],
        language='en',
        user={
            'client_user_id': 'portfolio-user-001'
        }
    )
    response = client.link_token_create(request)
    return response['link_token']

# Use this token with Plaid Link (web interface) to connect accounts
link_token = create_link_token()
print(f"Use this link token in Plaid Link: {link_token}")
```

### Step 3: Fetch Portfolio Holdings

```python
def get_portfolio_holdings(access_token):
    """Retrieve current investment holdings"""
    request = InvestmentsHoldingsGetRequest(
        access_token=access_token
    )
    response = client.investments_holdings_get(request)

    holdings_data = []
    for holding in response['holdings']:
        holdings_data.append({
            'ticker': holding['security_id'],
            'quantity': holding['quantity'],
            'value': holding['institution_value'],
            'cost_basis': holding.get('cost_basis', 0),
            'account_id': holding['account_id']
        })

    # Get security details
    securities = {s['security_id']: s for s in response['securities']}

    # Enhance holdings with security info
    for holding in holdings_data:
        security = securities.get(holding['ticker'], {})
        holding['name'] = security.get('name', 'Unknown')
        holding['ticker_symbol'] = security.get('ticker_symbol', 'N/A')
        holding['type'] = security.get('type', 'Unknown')
        holding['close_price'] = security.get('close_price', 0)

    return holdings_data
```

### Step 4: Track Your Target Funds

```python
def analyze_yield_funds(holdings):
    """Analyze specific high-yield funds"""
    target_funds = ['CLM', 'CRF', 'GOF', 'QQQY', 'YMAX']

    fund_analysis = []
    for holding in holdings:
        if holding['ticker_symbol'] in target_funds:
            fund_analysis.append({
                'symbol': holding['ticker_symbol'],
                'shares': holding['quantity'],
                'market_value': holding['value'],
                'cost_basis': holding['cost_basis'],
                'current_price': holding['close_price'],
                'unrealized_gain': holding['value'] - holding['cost_basis']
            })

    return fund_analysis
```

### Step 5: Fetch Dividend Transactions

```python
def get_dividend_income(access_token, days_back=90):
    """Retrieve dividend transactions"""
    start_date = datetime.now().date() - timedelta(days=days_back)
    end_date = datetime.now().date()

    request = InvestmentsTransactionsGetRequest(
        access_token=access_token,
        start_date=start_date,
        end_date=end_date
    )
    response = client.investments_transactions_get(request)

    dividends = []
    for transaction in response['investment_transactions']:
        if transaction['subtype'] == 'dividend':
            dividends.append({
                'date': transaction['date'],
                'symbol': transaction.get('security_id', 'Unknown'),
                'amount': transaction['amount'],
                'description': transaction.get('name', '')
            })

    return dividends
```

### Step 6: Export to Excel

```python
import pandas as pd

def export_portfolio_to_excel(holdings, dividends, filename='portfolio_data.xlsx'):
    """Export portfolio data to Excel for analysis"""

    # Create Excel writer object
    with pd.ExcelWriter(filename, engine='openpyxl') as writer:
        # Holdings sheet
        holdings_df = pd.DataFrame(holdings)
        holdings_df.to_excel(writer, sheet_name='Holdings', index=False)

        # Dividends sheet
        dividends_df = pd.DataFrame(dividends)
        dividends_df.to_excel(writer, sheet_name='Dividends', index=False)

        # Summary calculations
        summary = {
            'Total Portfolio Value': holdings_df['value'].sum(),
            'Total Cost Basis': holdings_df['cost_basis'].sum(),
            'Total Unrealized Gain': holdings_df['value'].sum() - holdings_df['cost_basis'].sum(),
            'Monthly Dividend Income': dividends_df['amount'].sum() / 3  # Assuming 90 days of data
        }
        summary_df = pd.DataFrame(summary.items(), columns=['Metric', 'Value'])
        summary_df.to_excel(writer, sheet_name='Summary', index=False)

    print(f"Portfolio data exported to {filename}")
```

### Step 7: Calculate Blended Yield

```python
def calculate_blended_yield(fund_holdings, annual_dividends):
    """Calculate weighted average yield across portfolio"""
    total_value = sum(h['market_value'] for h in fund_holdings)

    weighted_yield = 0
    for holding in fund_holdings:
        weight = holding['market_value'] / total_value
        # You would need to fetch actual yield data for each fund
        # This is a placeholder - replace with actual yield lookup
        fund_yields = {
            'CLM': 0.168,  # 16.8% example
            'CRF': 0.162,  # 16.2% example
            'GOF': 0.156,  # 15.6% example
            'QQQY': 0.145, # 14.5% example
            'YMAX': 0.172  # 17.2% example
        }
        fund_yield = fund_yields.get(holding['symbol'], 0)
        weighted_yield += weight * fund_yield

    return weighted_yield
```

## Full Integration Script

```python
# main_portfolio_tracker.py
import schedule
import time

def update_portfolio_data():
    """Main function to update all portfolio data"""
    try:
        # Get access token (stored securely after initial link)
        access_token = os.getenv('PLAID_ACCESS_TOKEN')

        # Fetch current holdings
        holdings = get_portfolio_holdings(access_token)

        # Analyze target funds
        fund_analysis = analyze_yield_funds(holdings)

        # Get recent dividends
        dividends = get_dividend_income(access_token)

        # Calculate metrics
        blended_yield = calculate_blended_yield(fund_analysis, dividends)

        # Export to Excel
        export_portfolio_to_excel(holdings, dividends)

        print(f"Portfolio update complete. Blended yield: {blended_yield:.2%}")

    except Exception as e:
        print(f"Error updating portfolio: {e}")

# Schedule daily updates
schedule.every().day.at("09:30").do(update_portfolio_data)

# Run the scheduler
while True:
    schedule.run_pending()
    time.sleep(60)
```

## Margin Analysis Integration

```python
def analyze_margin_risk(holdings, margin_balance, margin_rate=0.12):
    """Analyze margin utilization and risk"""
    total_value = sum(h['value'] for h in holdings)
    margin_ratio = margin_balance / total_value

    # Calculate maintenance requirement (typically 25-30%)
    maintenance_req = total_value * 0.30

    # Calculate cushion before margin call
    excess_equity = total_value - margin_balance - maintenance_req

    # Stress test scenarios
    scenarios = {}
    for drop in [0.10, 0.20, 0.30, 0.40]:
        new_value = total_value * (1 - drop)
        new_equity = new_value - margin_balance
        margin_call = new_equity < maintenance_req
        scenarios[f"{int(drop*100)}% drop"] = {
            'portfolio_value': new_value,
            'equity': new_equity,
            'margin_call': margin_call
        }

    return {
        'current_margin_ratio': margin_ratio,
        'excess_equity': excess_equity,
        'annual_margin_cost': margin_balance * margin_rate,
        'stress_scenarios': scenarios
    }
```

## Security Best Practices

1. **Never hardcode credentials** - Always use environment variables
2. **Secure token storage** - Store access tokens in encrypted keychain/vault
3. **Use webhook endpoints** - For real-time updates instead of polling
4. **Implement error handling** - Gracefully handle API failures
5. **Rate limiting** - Respect PLAID's rate limits (varies by plan)

## Testing with Sandbox

```python
# Use PLAID's sandbox for testing without real accounts
SANDBOX_INSTITUTIONS = {
    'Chase': 'ins_109508',
    'Bank of America': 'ins_109509',
    'Wells Fargo': 'ins_109510',
    'Citi': 'ins_109511',
    'Capital One': 'ins_109512'
}

# Sandbox credentials for testing
# Username: user_good
# Password: pass_good
```

## Next Steps

1. **Set up PLAID account** and get API credentials
2. **Test with sandbox** before connecting real accounts
3. **Implement authentication flow** using Plaid Link
4. **Store access tokens securely** after account linking
5. **Create Excel templates** that match the exported data structure
6. **Set up automated scheduling** for daily updates
7. **Build dashboard visualizations** using the exported data

## Resources

- [PLAID API Documentation](https://plaid.com/docs/)
- [PLAID Python SDK](https://github.com/plaid/plaid-python)
- [PLAID Postman Collection](https://www.postman.com/plaid-api/workspace/plaid/overview)
- [Investment API Guide](https://plaid.com/docs/investments/)
- [PLAID Link Integration](https://plaid.com/docs/link/)

## Cost Considerations

- **Development**: Free (100 live credentials for testing)
- **Production**: Volume-based pricing
- **Investment API**: Premium product (contact sales)
- **Typical costs**: $0.10-$0.50 per linked account/month

## Support

- PLAID Support: support@plaid.com
- Developer Forum: https://plaid.com/docs/support/
- Status Page: https://status.plaid.com/
