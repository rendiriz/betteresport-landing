import { useRef } from 'react'
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import { supabase } from '../../../utils/initSupabase'
import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  Text,
  Input,
  Textarea,
  Select,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
  Icon,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FaFile } from 'react-icons/fa'

import ContainerHome from '../../../layouts/container/home'

function Provocation({ games, socialMedias }) {
  const inputRef = useRef()

  const initialValues = {
    name: '',
    email: '',
    id_game: '',
    title: '',
    report: '',
    provocations: [
      {
        id_social_media: '',
        username: '',
        evidence: null,
        evidence_link: '',
      },
    ],
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Harus diisi.'),
    email: Yup.string().required('Harus diisi.').email('Email tidak valid.'),
    id_game: Yup.string().required('Harus diisi.'),
    title: Yup.string().required('Harus diisi.'),
    report: Yup.string().required('Harus diisi.'),
    provocations: Yup.array().of(
      Yup.object().shape({
        id_social_media: Yup.string().required('Harus diisi.'),
        username: Yup.string().required('Harus diisi.'),
        evidence: Yup.mixed()
          .test('fileSize', 'File terlalu besar.', value => {
            return (
              value === null ||
              value === undefined ||
              (value && value.size <= 3 * 1024 * 1024)
            )
          })
          .test('fileFormat', 'Format tidak sesuai.', value => {
            return (
              value === null ||
              value === undefined ||
              (value &&
                ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type))
            )
          }),
        evidence_link: Yup.string(),
      })
    ),
  })

  async function onSubmit(fields) {
    const input = fields

    const { provocations, ...bodyReport } = input

    Object.assign(bodyReport, {
      code: null,
      category: 'provocation',
    })

    const { data: report } = await supabase.from('report').insert(bodyReport)

    const bodyReportProvocation = input.provocations

    bodyReportProvocation.map(item => {
      item.id_report = report[0].id_report
      return item
    })

    const { data: reportProvocation } = await supabase
      .from('report_provocation')
      .insert(bodyReportProvocation)

    Router.push('/report/provocation')
  }

  return (
    <>
      <NextSeo
        title="Lapor Provokasi"
        titleTemplate="%s | Better Esport"
        description="Laporkan akun provokasi untuk membuat komunitas esport Indonesia lebih baik."
      />
      <Container maxW="container.lg" minH={'90vh'}>
        <Flex
          py={10}
          justify={'space-between'}
          direction={{ base: 'column', md: 'row' }}
        >
          <Box mb={{ base: 6, lg: 0 }}>
            <Heading lineHeight={1.1} fontWeight={700} fontSize={'3xl'}>
              Lapor Provokasi
            </Heading>
          </Box>
        </Flex>

        <Box mb={12}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {props => (
              <Form>
                <Box mb={4}>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        isRequired
                      >
                        <FormLabel htmlFor="name">Nama</FormLabel>
                        <Input {...field} id="name" placeholder="Nama" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box mb={4}>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                        isRequired
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input {...field} id="email" placeholder="Email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box
                  mb={4}
                  borderBottom={'1px'}
                  borderBottomColor={'teal.500'}
                  py={2}
                >
                  <Text color={'teal.500'} fontSize={'lg'}>
                    Laporan
                  </Text>
                </Box>

                <Box mb={4}>
                  <Field name="id_game">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.id_game && form.touched.id_game}
                        isRequired
                      >
                        <FormLabel htmlFor="id_game">Game</FormLabel>
                        <Select
                          {...field}
                          id="id_game"
                          placeholder="Pilih game"
                        >
                          {games.map(game => (
                            <option key={game.id_game} value={game.id_game}>
                              {game.name}
                            </option>
                          ))}
                        </Select>
                        <FormErrorMessage>
                          {form.errors.id_game}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box mb={4}>
                  <Field name="title">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.title && form.touched.title}
                        isRequired
                      >
                        <FormLabel htmlFor="title">Judul</FormLabel>
                        <Input {...field} id="title" placeholder="Judul" />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box mb={4}>
                  <Field name="report">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.report && form.touched.report}
                        isRequired
                      >
                        <FormLabel htmlFor="report">
                          Deskripsi Laporan
                        </FormLabel>
                        <Textarea
                          {...field}
                          id="report"
                          placeholder="Deskripsi Laporan"
                        />
                        <FormErrorMessage>
                          {form.errors.report}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>

                <Box
                  mb={4}
                  borderBottom={'1px'}
                  borderBottomColor={'teal.500'}
                  py={2}
                >
                  <Text color={'teal.500'} fontSize={'lg'}>
                    Laporan Akun
                  </Text>
                </Box>

                {/* <code>{JSON.stringify(props.values)}</code> */}

                <FieldArray name="provocations">
                  {() =>
                    props.values.provocations.map((provocation, i) => {
                      return (
                        <div key={i}>
                          <Grid
                            mb={4}
                            templateColumns={{
                              base: 'repeat(1, 1fr)',
                              lg: 'repeat(6, 1fr)',
                            }}
                            gap={4}
                          >
                            <GridItem colSpan={2}>
                              <Field name={`provocations.${i}.id_social_media`}>
                                {({ field, form }) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.provocations?.length &&
                                      form.errors.provocations[i]
                                        .id_social_media &&
                                      form.touched.provocations?.length &&
                                      form.touched.provocations[i]
                                        .id_social_media
                                    }
                                    isRequired
                                  >
                                    <FormLabel htmlFor="id_social_media">
                                      Sosial Media
                                    </FormLabel>
                                    <Select
                                      {...field}
                                      id="id_social_media"
                                      placeholder="Pilih sosial media"
                                    >
                                      {socialMedias.map(socialMedia => (
                                        <option
                                          key={socialMedia.id_social_media}
                                          value={socialMedia.id_social_media}
                                        >
                                          {socialMedia.name}
                                        </option>
                                      ))}
                                    </Select>
                                    <FormErrorMessage>
                                      {form.errors.provocations?.length &&
                                        form.errors.provocations[i]
                                          .id_social_media}
                                    </FormErrorMessage>
                                  </FormControl>
                                )}
                              </Field>
                            </GridItem>

                            <GridItem colSpan={2}>
                              <Field name={`provocations.${i}.username`}>
                                {({ field, form }) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.provocations?.length &&
                                      form.errors.provocations[i].username &&
                                      form.touched.provocations?.length &&
                                      form.touched.provocations[i].username
                                    }
                                    isRequired
                                  >
                                    <FormLabel htmlFor="username">
                                      Username
                                    </FormLabel>
                                    <Input
                                      {...field}
                                      id="username"
                                      placeholder="Username"
                                    />
                                    <FormErrorMessage>
                                      {form.errors.provocations?.length &&
                                        form.errors.provocations[i].username}
                                    </FormErrorMessage>
                                  </FormControl>
                                )}
                              </Field>
                            </GridItem>

                            <GridItem colSpan={2} display={'none'}>
                              <FormControl
                                isInvalid={
                                  props.errors.provocations?.length &&
                                  props.errors.provocations[i].evidence
                                }
                              >
                                <FormLabel htmlFor="evidence">
                                  Foto Bukti
                                </FormLabel>
                                <input
                                  name={`provocations.${i}.evidence`}
                                  type="file"
                                  accept=".png, .jpg, .jpeg"
                                  ref={inputRef}
                                  style={{ display: 'none' }}
                                  onChange={event => {
                                    console.log(props)
                                    console.log(event.currentTarget.files[0])
                                    props.setFieldValue(
                                      `provocations.${i}.evidence`,
                                      event.currentTarget.files[0]
                                    )
                                  }}
                                ></input>
                                <Input
                                  placeholder="Foto Bukti"
                                  onClick={() => inputRef.current.click()}
                                  value={
                                    props.values.provocations[i].evidence?.name
                                  }
                                />
                                <FormErrorMessage>
                                  {props.errors.provocations?.length &&
                                    props.errors.provocations[i].evidence}
                                </FormErrorMessage>
                              </FormControl>
                            </GridItem>

                            <GridItem colSpan={2}>
                              <Field name={`provocations.${i}.evidence_link`}>
                                {({ field, form }) => (
                                  <FormControl
                                    isInvalid={
                                      form.errors.provocations?.length &&
                                      form.errors.provocations[i]
                                        .evidence_link &&
                                      form.touched.provocations?.length &&
                                      form.touched.provocations[i].evidence_link
                                    }
                                  >
                                    <FormLabel htmlFor="evidence_link">
                                      Link Bukti
                                    </FormLabel>
                                    <Input
                                      {...field}
                                      id="evidence_link"
                                      placeholder="Link Bukti"
                                    />
                                    <FormErrorMessage>
                                      {form.errors.provocations?.length &&
                                        form.errors.provocations[i]
                                          .evidence_link}
                                    </FormErrorMessage>
                                  </FormControl>
                                )}
                              </Field>
                            </GridItem>

                            {i > 0 && (
                              <GridItem colSpan={1}>
                                <FormControl>
                                  <FormLabel>Aksi</FormLabel>
                                  <Button
                                    lineHeight={0}
                                    colorScheme="red"
                                    variant="solid"
                                    w="full"
                                  >
                                    Hapus
                                  </Button>
                                </FormControl>
                              </GridItem>
                            )}
                          </Grid>
                        </div>
                      )
                    })
                  }
                </FieldArray>

                <Box mb={4} display={'none'}>
                  <Button lineHeight={0} colorScheme="teal" variant="solid">
                    Tambah
                  </Button>
                </Box>

                <Box display={'flex'} justifyContent={'end'} mt={6}>
                  <Button
                    lineHeight={0}
                    colorScheme="teal"
                    variant="solid"
                    isLoading={props.isSubmitting}
                    type="submit"
                    w="full"
                  >
                    Simpan
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const { data: games } = await supabase.from('game').select('*')
  const { data: socialMedias } = await supabase
    .from('social_media')
    .select('*')
    .order('name', { ascending: true })

  return {
    props: {
      games,
      socialMedias,
    },
  }
}

Provocation.Layout = ContainerHome

export default Provocation
