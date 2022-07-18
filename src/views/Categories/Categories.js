/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from "react"
// import useUpdateData from "../../hooks/useUpdateData"
import { useTheme, TextField, InputAdornment, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, Alert } from "@mui/material"
import { Close, Loop, Remove } from "@mui/icons-material"
import { Button } from "../../components/styled"
import styles from "./Catetgories.style"
import { jsx } from "@emotion/react"
import { useFormatCurrency } from "../../hooks"
import Category from "./Category"
import { useLazyQuery, useMutation } from "@apollo/client"
import categoriesQueries from "../../server/categoriesQueries"
import { useAuth0 } from "@auth0/auth0-react"

// eslint-disable-next-line react/prop-types
export default function Categories({ setCategory }) {
    const [ isCreateFormOpen, setIsCreateFormOpen ] = useState(false)
    const [ isEditFormOpen, setIsEditFormOpen ] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [addCategory, { error: requestError, loading }] = useMutation(categoriesQueries.addCategory())
    const theme = useTheme()

    const { user } = useAuth0()
    const email = user?.email

    const [getUserCategories, { data, error: queryError }] = useLazyQuery(categoriesQueries.userCategories())
    useEffect(() => {
        if (email == null) return
        getUserCategories({ variables: { userId: email }})
    }, [email])
    if (queryError) console.error(queryError)

    const userCategories = data?.userCategories
    const categories = userCategories?.categories
    const total = userCategories?.total
    const remaining = userCategories?.remaining

    const openEditForm = (categoryId) => {
        setIsEditFormOpen(true)
        setSelectedCategory(categoryId)
    }

    if (userCategories) {
        return (
            <>
                <div css={styles.cards({ gap: theme.spacing(3)})}>
                    <div css={styles.topSection({ color: theme.palette.accent.main })}>
                        <h1>Categories</h1>  
                        <Button 
                            onClick={() => setIsEditMode(isEditMode => !isEditMode)} 
                            variant="text" 
                            color="accent">{isEditMode ? 'Exit' : 'Edit'}
                        </Button>
                    </div>
                    { total && remaining && <Category name="Total" totalCategory={true} total={total} available={remaining} /> }
                    {categories && categories.map( (category) => {
                        return (
                            <div key={category.category_id} css={styles.categoryContainer}>
                                {isEditMode && 
                                    <Button 
                                        variant="text" 
                                        color="accent" 
                                        css={styles.deleteButton}
                                        onClick={() => openEditForm(category.category_id)}
                                    >
                                        Edit
                                    </Button>
                                }
                                <Category
                                    id={category.category_id} 
                                    name={category.name} 
                                    totalCategory={false} 
                                    total={category.total} 
                                    available={category.remaining} 
                                    setCategory={setCategory}
                                /> 
                            </div>
                        )
                    })}
                </div>
                {isEditMode && <Button variant="outlined" color="accent" onClick={() => setIsCreateFormOpen(true)}>Create new category</Button> }
                <CategoryForm 
                    isFormOpen={isCreateFormOpen} 
                    setIsFormOpen={setIsCreateFormOpen} 
                    userId={email} 
                    action={addCategory} 
                    requestError={requestError} 
                    loading={loading} 
                />
                <CategoryForm 
                    isFormOpen={isEditFormOpen}
                    setIsFormOpen={setIsEditFormOpen}
                    userId={email}
                    action={() => console.log('edit')}
                    requestError={null}
                    loading={false}
                    category={selectedCategory}
                />
            </>
        )
    } else {
        return (
            <>
                <h1>Categories</h1>
                <p>Loading...</p>
            </>
        )
    }
}

function CategoryForm({ isFormOpen, setIsFormOpen, userId, action, requestError, loading, category = null }) {
    const [name, setName] = useState(null)
    const [total, setTotal] = useState(null)
    const [error, setError] = useState(null)
    const format = useFormatCurrency()
    const theme = useTheme()
    const isEditMode = category !== null

    const handleClick = () => {
        if (!name && !total) {
            setError("Enter a valid name and total.")
            return
        }
        if (!name) {
            setError("Enter a valid name.")
            return
        }
        if (!total) {
            setError("Enter a valid total.")
            return
        }
        action({ variables: { userId, name, total: parseFloat(total) }})
    }

    const handleCancel = () => {
        setIsFormOpen(false)
        setName(null)
        setTotal(null)
        setError(null)
    }

    useEffect(() => {
        if (requestError) {
            console.error(requestError)
            setError("Something went wrong. Try again.")
        }
    }, [requestError])

    return (
        <Dialog open={isFormOpen}>
            <div css={styles.formHeader}>
                <DialogTitle >{ isEditMode ? 'Edit' : 'Add New' } Category</DialogTitle>
                <IconButton onClick={() => setIsFormOpen(false)} css={styles.formButton}><Close /></IconButton>
            </div>
            <DialogContent css={styles.formContent(theme.spacing(3))}>
                { error && <Alert severity="error">{error}</Alert> }
                <TextField 
                    label="Category Name"
                    id="category-name"
                    value={name}
                    onChange={({currentTarget}) => setName(currentTarget.value)}
                    style={{display: 'block', width: '100%'}}
                />
                <TextField 
                    label="Total"
                    value={total}
                    id="category-total"
                    InputProps={{ startAdornment: <InputAdornment position="start">{format()}</InputAdornment> }}
                    onChange={({currentTarget}) => setTotal(currentTarget.value)}
                    type="number"
                />
            </DialogContent>    
            <DialogActions>
                { loading ? <Loop /> : <Button variant="outlined" onClick={handleClick}>
                    { isEditMode ? 'EDIT CATEGORY' : 'CREATE CATEGORY' }
                </Button>}
                { isEditMode && <Button variant="text" color="red" onClick={handleCancel}>Delete</Button> }
            </DialogActions>
        </Dialog>
    )
}