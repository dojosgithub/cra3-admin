import { WrappingFunction } from '@shopify/react-compose'
import { Alert } from '@utils'
import axios from 'axios'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useRootStore } from 'src/stores'
const withRightButtons: WrappingFunction = (WrappedComponent: any) =>
  observer((props) => {
    const { state, templatesMutate, templates } = props
    const { dialogStore } = useRootStore()
    const rightButtons: any = [
      // {
      //   title: 'Delete',
      //   onClick: async () => {
      //     const selectedRowIds = toJS(state.selectedRowIds)
      //     const data = {
      //       filter: {
      //         _id: {
      //           $in: selectedRowIds,
      //         },
      //       },
      //       update: {
      //         isDeleted: true,
      //       },
      //     }
      //     try {
      //       await axios.patch('v1/templates', data)
      //     } catch (error) {
      //       Alert.handle(error)
      //     }

      //     templatesMutate()
      //     dialogStore.success()
      //     state.selectedRowIds = {}
      //   },
      //   color: 'error',
      // },
    ]
    return <WrappedComponent {...props} rightButtons={rightButtons} />
  })

export default withRightButtons
