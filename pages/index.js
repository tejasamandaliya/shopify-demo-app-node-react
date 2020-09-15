import { EmptyState, Layout, Page, Button, Card, Stack, ButtonGroup } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';
import React from "react";

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
  state = { open: false };
  render() {
    const emptyState = !store.get('ids');
    return (
      <Page>
        <TitleBar
          title="Sample App"
          primaryAction={{
          content: 'Create User Guide',
          onAction: () => this.setState({ open: true }),
        }} />
          <Card title="Status">
              <Card.Section>
                  <Stack spacing="loose" vertical>
                      <Stack distribution="trailing">
                          <ButtonGroup>
                              <Button primary>Enable</Button>
                              <Button plain>Disable</Button>
                          </ButtonGroup>
                      </Stack>
                  </Stack>
              </Card.Section>
          </Card>
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        {emptyState ? (
          <Layout>
            <EmptyState
              heading="Discount your products temporarily"
              action={{
                content: 'Create User Guide',
                onAction: () => this.setState({ open: true }),
              }}
              image={img}
            >
              <p>Select products to change their price temporarily.</p>
            </EmptyState>
          </Layout>
        ) : (
            <ResourceListWithProducts />
          )}
      </Page>
    );
  }

  handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    this.setState({ open: false });
    store.set('ids', idsFromResources);
  };
}

export default Index;
