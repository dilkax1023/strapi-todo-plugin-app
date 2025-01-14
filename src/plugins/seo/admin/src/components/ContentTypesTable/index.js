import React from "react";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { LinkButton } from "@strapi/design-system/LinkButton";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Flex } from "@strapi/design-system/Flex";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import {
  Tabs,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from "@strapi/design-system/Tabs";

const ContentTypesTable = ({ contentTypes }) => {
  return (
    <Box padding={8}>
      <TabGroup label="label" id="tabs">
        <Tabs>
          <Tab>
            <Typography variant="omega"> Collection Types</Typography>
          </Tab>
          <Tab>
            <Typography variant="omega"> Single Types</Typography>
          </Tab>
        </Tabs>
        <TabPanels>
          <TabPanel>
            {/* TABLE */}
            <Table colCount={2} rowCount={contentTypes.collectionTypes.length}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">Name</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {contentTypes &&
                contentTypes.collectionTypes &&
                !_.isEmpty(contentTypes.collectionTypes) ? (
                  contentTypes.collectionTypes.map((item) => (
                    <Tr key={item.uid}>
                      <Td>
                        <Typography textColor="neutral800">
                          {item.globalId}
                        </Typography>
                      </Td>
                      <Td>
                        <Flex justifyContent="right" alignItems="right">
                          <LinkButton>Link</LinkButton>
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Box padding={8} background="neutral0">
                    <EmptyStateLayout
                      icon={<Illo />}
                      content={formatMessage({
                        id: getTrad("SEOPage.info.no-collection-types"),
                        defaultMessage:
                          "You don't have any collection-types yet...",
                      })}
                      action={
                        <LinkButton
                          to="/plugins/content-type-builder"
                          variant="secondary"
                          startIcon={<Plus />}
                        >
                          {formatMessage({
                            id: getTrad("SEOPage.info.create-collection-type"),
                            defaultMessage: "Create your first collection-type",
                          })}
                        </LinkButton>
                      }
                    />
                  </Box>
                )}
              </Tbody>
            </Table>
            {/* END TABLE */}
          </TabPanel>
          <TabPanel>
            {/* TABLE */}
            <Table colCount={2} rowCount={contentTypes.singleTypes.length}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">Name</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {contentTypes &&
                contentTypes.singleTypes &&
                !_.isEmpty(contentTypes.singleTypes) ? (
                  contentTypes.singleTypes.map((item) => (
                    <Tr key={item.uid}>
                      <Td>
                        <Typography textColor="neutral800">
                          {item.globalId}
                        </Typography>
                      </Td>
                      <Td>
                        <Flex justifyContent="right" alignItems="right">
                          <LinkButton>Link</LinkButton>
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Box padding={8} background="neutral0">
                    <EmptyStateLayout
                      icon={<Illo />}
                      content={formatMessage({
                        id: getTrad("SEOPage.info.no-single-types"),
                        defaultMessage:
                          "You don't have any single-types yet...",
                      })}
                      action={
                        <LinkButton
                          to="/plugins/content-type-builder"
                          variant="secondary"
                          startIcon={<Plus />}
                        >
                          {formatMessage({
                            id: getTrad("SEOPage.info.create-single-type"),
                            defaultMessage: "Create your first single-type",
                          })}
                        </LinkButton>
                      }
                    />
                  </Box>
                )}
              </Tbody>
            </Table>
            {/* END TABLE */}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Box>
  );
};
export default ContentTypesTable;
